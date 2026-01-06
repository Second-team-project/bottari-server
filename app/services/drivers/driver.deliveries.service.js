/**
 * @file app/services/drivers/driver.deliveries.service.js
 * @description driver deliveries Service
 * 251230 v1.0.0 김위민 init
 */

import dayjs from "dayjs";
import driverAssignmentRepository from "../../repositories/driverAssignment.repository.js";

/**
 * 배정 내역 조회 후 프론트엔드용 데이터 가공
 */
async function getAssignedDeliveries(driverId) {
  // 오늘 기준 시간 설정
  const todayStart = dayjs().startOf('day').toDate();
  const todayEnd = dayjs().endOf('day').toDate();
  
  // 이번 달 기준 시간 설정
  const monthStart = dayjs().startOf('month').toDate();
  const monthEnd = dayjs().endOf('month').toDate();

  const [assignments, todayCount, monthCount] = await Promise.all([
    driverAssignmentRepository.findTodayAssignedByDriverId(null, driverId),
    driverAssignmentRepository.countCompletedDeliveries(driverId, todayStart, todayEnd),
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
async function updateDeliveryState(reservationId, currentState) {
  const stateFlow = {
    'RESERVED' : 'PICKING_UP',
    'PICKING_UP': 'IN_PROGRESS',
    'IN_PROGRESS': 'COMPLETED'
  };

  const nextState = stateFlow[currentState];

  await driverAssignmentRepository.updateReservationState(null, reservationId, nextState);
  return { nextState };
}

export default {
  getAssignedDeliveries,
  updateDeliveryState
};