/**
 * @file app/services/drivers/driver.deliveries.service.js
 * @description driver deliveries Service
 * 251230 v1.0.0 김위민 init
 */

import dayjs from "dayjs";
import driverAssignmentRepository from "../../repositories/driverAssignment.repository.js";
import reservationRepository from "../../repositories/reservation.repository.js";
import subscriptionService from "../subscription.service.js";
import USER_TYPE from "../../../configs/user.type.enum.js";
import customError from "../../errors/custom.error.js";
import { NOT_ATTENDANCE_ERROR } from "../../../configs/responseCode.config.js";
import driverAttendanceLogRepository from "../../repositories/driverAttendanceLog.repository.js";

/**
 * 배정 내역 조회 후 프론트엔드용 데이터 가공
 */
async function getAssignedDeliveries(driverId, date) {
  // 리스트 조회용 날짜 (선택한 날짜가 없으면 오늘)
  const targetDate = date ? dayjs(date) : dayjs();

  const listStart = targetDate.startOf('day').toDate();
  const listEnd = targetDate.endOf('day').toDate();
  
  // 실적 계산용 날짜 (무조건 '진짜 오늘'로 고정)
  const realTodayStart = dayjs().startOf('day').toDate();
  const realTodayEnd = dayjs().endOf('day').toDate();
  
  const monthStart = dayjs().startOf('month').toDate();
  const monthEnd = dayjs().endOf('month').toDate();

  const [assignments, todayCount, monthCount] = await Promise.all([
    // 리스트는 선택한 날짜(targetDate) 기준 범위로 조회
    driverAssignmentRepository.findTodayAssignedByDriverId(null, driverId, listStart, listEnd),
    // 실적은 현재(realToday) 기준 범위로 조회
    driverAssignmentRepository.countCompletedDeliveries(driverId, realTodayStart, realTodayEnd),
    driverAssignmentRepository.countCompletedDeliveries(driverId, monthStart, monthEnd)
  ]);

  const typeMap = {
    'CARRIER': '캐리어',
    'BAG': '가방',
    'BOX': '상자',
    'GOLF': '골프가방'
  };

  const formattedList = assignments.map(asgn => {
    const reservation = asgn.driverAssignmentReservation;
    const delivery = reservation.reservIdDeliveries?.[0] || {};
    const booker = reservation.reservIdBookers?.[0] || {};
    const luggages = reservation.reservIdLuggages || [];

    const luggageList = luggages.map(l => {
      const koreanType = typeMap[l.itemType] || l.itemType;
      
      // 1. 값 정제 함수 (실제 null, undefined, 문자열 "null"을 모두 null로 반환)
      const clearValue = (val) => {
        if (!val) return null;
        const stringVal = String(val).trim();
        // 문자열 "null" 또는 "NULL"인 경우 null 반환
        if (stringVal.toLowerCase() === 'null' || stringVal === '') return null;
        return stringVal;
      };

      const weight = clearValue(l.itemWeight);
      const size = clearValue(l.itemSize);

      // 2. 무게 처리
      const weightText = weight === 'OVER' ? '30kg 초과' : weight;
      
      // 3. 크기 처리
      let sizeText = null;
      if (size) {
        if (size === 'OVER') {
          sizeText = '24인치 초과';
        } else {
          // 캐리어 타입일 때만 '인치' 추가
          sizeText = l.itemType === 'CARRIER' ? `${size}인치` : size;
        }
      }

      // 4. 최종 문자열 조합
      return [koreanType, weightText, sizeText, l.count ? `${l.count}개` : null]
        .filter(Boolean)
        .join(' / ');
    });

    return {
      id: asgn.id,
      resId: reservation.id,
      deliveryState: reservation.state,
      startAddr: delivery.startedAddr,
      endAddr: delivery.endedAddr,
      pickupTime: delivery.startedAt ? dayjs(delivery.startedAt).format('HH:mm') : '',
      userName: booker.userName,
      userPhone: booker.phone,
      request: reservation.notes,
      luggageList: luggageList 
    };
  });

  return {
    todayPerformance: todayCount,
    monthPerformance: monthCount,
    list: formattedList
  };
}

/**
 * 배송 상태 단계별 변경
 */
async function updateDeliveryState(driverId, reservationId, currentState) {
  // 출근 상태 확인
  const activeLog = await driverAttendanceLogRepository.findActiveAttendanceLog(null, driverId);

  if (!activeLog || activeLog.state !== "CLOCKED_IN") {
    throw customError("출근 상태가 아님", NOT_ATTENDANCE_ERROR);
  }

  const stateFlow = {
    'RESERVED' : 'PICKING_UP',
    'PICKING_UP': 'IN_PROGRESS',
    'IN_PROGRESS': 'COMPLETED'
  };

  const nextState = stateFlow[currentState];

  await driverAssignmentRepository.updateReservationState(null, reservationId, nextState);

  // 푸시 알림 발송 로직 (비동기로 실행하되 await를 쓰지 않아 응답 속도 유지)
  try {
    // 해당 예약 정보를 조회하여 고객(userId) 찾기
    const userResult = await reservationRepository.findUserIdByPk(null, reservationId)
    
    if (userResult) {
      let pushTitle = "[보따리 배송 알림]";
      let pushBody = "";

      // 상태별 메시지 설정
      switch (nextState) {
        case 'PICKING_UP':
          pushBody = "기사님이 고객님의 보따리 픽업을 위해 이동 중입니다.";
          break;
        case 'IN_PROGRESS':
          pushBody = "기사님이 보따리 픽업을 완료하여 배송을 시작했습니다.";
          break;
        case 'COMPLETED':
          pushBody = "보따리 배송이 완료되었습니다. 이용해 주셔서 감사합니다!";
          break;
      }

      if (userResult && userResult.userId) {
        // pushService 호출 (대상Id, 타입, 데이터)
        // 비동기 처리를 위해 .catch만 붙여서 백그라운드에서 실행되게 함
        subscriptionService.sendPushNotification(userResult.userId, USER_TYPE.MEMBER, {
          title: pushTitle,
          message: pushBody,
          data: {
            targetUrl: "/reserve/list",
          }
        })
        .catch(
          // TODO : 시간 날 때 로그 남기는 테이블 추가해서 성공 실패 기록하게 하기
          err => console.error('Push Notification Error:', err)
        );
      }
    }
  } catch (error) {
    // 푸시 과정에서 에러가 나도 배송 상태 변경 응답은 나가야 하므로 로그만 남김
    console.error('Push data fetching error:', error);
  }

  return { nextState };
}

export default {
  getAssignedDeliveries,
  updateDeliveryState
};