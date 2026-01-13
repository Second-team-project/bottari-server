/**
 * @file app/services/admin.reservations.service.js
 * @description 관리자 예약 관리 service
 * 251224 v1.0.0 김민현 init
 */
import { NOT_FOUND_ERROR, UNMATCHING_USER_ERROR } from "../../../configs/responseCode.config.js";
import customError from "../../errors/custom.error.js";
import db from "../../models/index.js";
import reservationRepository from "../../repositories/reservation.repository.js";
import luggageRepository from "../../repositories/luggage.repository.js";
import reserveCodeUtil from "../../utils/reserveCode/reserve.code.util.js";
import bookerRepository from "../../repositories/booker.repository.js";
import subscriptionService from "../subscription.service.js";
import USER_TYPE from "../../../configs/user.type.enum.js";
import bcrypt from 'bcrypt';

/**
 * 예약 목록 페이지네이션(검색 조건 처리 추가)
 * @param {Object} params - 쿼리 파라미터 모음 (page, searchType, keyword, state, startDate, endDate)
 * @returns {Promise<Array<import("../../models/Reservation.js").Reservation>}
 */
async function pagination(params) {
  // 페이지 번호 처리
  const page = params.page ? parseInt(params.page) : 1;
  const limit = 20;
  const offset = limit * (page - 1);

  // 필터 객체 조립
  const filters = {
    searchType: params.searchType || null, // 검색 기준 (code, userName 등)
    keyword: params.keyword || null,       // 검색어
    state: params.state || null,           // 예약 상태
    startDate: params.startDate || null,   // 조회 시작일
    endDate: params.endDate || null,       // 조회 종료일
  };

  // 종료일 시간 보정
  // 사용자가 '2025-12-29'를 선택하면, DB에서는 '2025-12-29 00:00:00'으로 인식함.
  // 따라서 그 날의 마지막 시간인 '23:59:59'까지 포함되도록 문자열을 붙여줌.
  if (filters.endDate) {
    filters.endDate = `${filters.endDate} 23:59:59`;
  }
  
  return await reservationRepository.pagination(null, { limit, offset, filters });
}

/**
 * 예약 목록 상세
 * @param {number} id - 예약 ID
 * @returns {Promise<import("../../models/Reservation.js").Reservation>}
 */
async function show(id) {
  const reservation = await reservationRepository.findByPkJoinUser(null, id);

  if (!reservation) {
    throw new customError('해당 예약을 찾을 수 없습니다.', NOT_FOUND_ERROR); 
  }

  return reservation;
}

/**
 * 예약 등록
 * @returns {Promise<import("../../models/Reservation.js").Reservation>}
 */
async function create(data) {
  return await db.sequelize.transaction(async t => {
    // 유저 타입
    const userTypeKey = data.userId ? 'MEMBER' : 'GUEST';

    // 예약 코드 생성
    const codeData = {
      type: data.type,
      userType: userTypeKey,
    }

    const reservationCode = reserveCodeUtil.createReserveCode(codeData);

    // 예약 데이터 생성
    const createData = {
      userId: data.userId || null,
      price: data.price,
      notes: data.notes,
      code: reservationCode,
      state: data.state || 'PENDING_PAYMENT',
    };

    const newReservation = await reservationRepository.create(t, createData);

    if(data.items && data.items.length > 0) {
      const luggageList = data.items.map(item => ({
        reservId: newReservation.id,
        itemType: item.type,
        itemSize: item.size,
        itemWeight: item.weight,
        count: item.count || 1,
      }));

      await luggageRepository.bulkCreate(t, luggageList);
    }

    // 비회원 저장
    if (!data.userId && data.bookerInfo) {
      await bookerRepository.create(t, {
        reservId: newReservation.id,
        userName: data.bookerInfo.userName,
        email: data.bookerInfo.email,
        phone: data.bookerInfo.phone,
      });
    }

    t.afterCommit(() => {
      // 회원이고, 상태가 'COMPLETED'일 때 알림
      if (newReservation.userId && newReservation.state === 'COMPLETED') {
        subscriptionService.sendPushNotification(
          newReservation.userId, 
          USER_TYPE.MEMBER,
          { 
            title: '보관 알림', 
            message: '고객님의 짐이 안전하게 보관되었습니다.',
            data: {
              targetUrl: `/reserve/list`
            }
          }
        ).catch(err => console.error('Push Notification Error:', err));
      }
    });

    return newReservation;
  });
}

/**
 * 예약 정보 수정
 * @param {number} id - 예약 ID
 * @param {Object} data - 수정할 데이터들
 */
async function update(id, data) {
  return await db.sequelize.transaction(async t => {
    // 알림 발송 작업 모아둘 배열
    const notifications = [];

    // 해당 예약 존재 여부 확인
    const reservation = await reservationRepository.findByPkJoinUser(t, id);

    if (!reservation) {
      throw new customError('해당 예약을 찾을 수 없습니다.', NOT_FOUND_ERROR);
    }
    
    // 기본 정보 수정
    await reservationRepository.updateByPk(t, id, data);

    // 유저에게 보관 완료 알림
    if(data.state !== reservation.state) {
      if (data.state === 'RESERVED') {
        notifications.push(async () => {
          await subscriptionService.sendPushNotification(
            reservation.userId, 
            USER_TYPE.MEMBER, 
            { title: '보관 알림',
              message: '고객님의 짐이 보관되었습니다.',
              data: {
                targetUrl: `/reserve/list`
              }
            }
          );
        });
      }

      // 유저에게 '예약중'인 건을 '진행중'으로 바꿨을 때 알림
      if (reservation.state === 'RESERVED' && data.state === 'IN_PROGRESS') {
        notifications.push(async () => {
          await subscriptionService.sendPushNotification(
            reservation.userId,
            USER_TYPE.MEMBER,
            { 
              title: '보관 알림',
              message: '고객님의 짐을 보관중입니다.',
              data: {
                targetUrl: `/reserve/list`
              }
            }
          );
        });
      }
    }

    // 기사 배정 로직
    if (data.driverId !== undefined) {

      // 기존의 배정된 기사 확인
      const AssignedDriver = reservation.reservationsDrivers && reservation.reservationsDrivers[0];
      
      // 일단 기존에 배정된 기사가 있다면 '해제' 처리
      await reservationRepository.updateUnassigned(t, id);

      // 기존 기사에게 배정 취소 알림
      if (AssignedDriver) {
        notifications.push(async () => {
          await subscriptionService.sendPushNotification(
            AssignedDriver.id, 
            USER_TYPE.DRIVER, 
            { title: '배정 취소',
              message: '배정이 취소되었습니다.',
              data: {
                targetUrl: '/main'
              }
            }
          );
        });

        // 유저에게도 '기사 배정 취소' 알림
        if (data.driverId === null) {
          notifications.push(async () => {
            await subscriptionService.sendPushNotification(
              reservation.userId, 
              USER_TYPE.MEMBER, 
              { title: '배정 취소',
                message: '담당 기사 배정이 취소되었습니다.',
                data: {
                  targetUrl: '/reserve/list'
                }
              }
            );
          });
        }
      }

      // 새로운 driverId가 있다면 '배정' 생성
      if (data.driverId !== null) {
        await reservationRepository.createAssigned(t, {
          reservId: id,
          driverId: data.driverId
        });

        // 새 기사에게 신규 배정 알림
        notifications.push(async () => {
          await subscriptionService.sendPushNotification(
            data.driverId, 
            USER_TYPE.DRIVER, 
            { title: '배차 알림',
              message: '새로운 예약이 배정되었습니다.',
              data: {
                targetUrl: '/main'
              }
            }
          );
        });

        // 유저에게 '기사 배정 완료' 알림
        notifications.push(async () => {
          await subscriptionService.sendPushNotification(
            reservation.userId, 
            USER_TYPE.MEMBER, 
            { title: '기사 배정',
              message: '담당 기사님이 배정되었습니다.',
              data: {
                targetUrl: `/reserve/list`
              }
            }
          );
        });
      }
    }

    // 짐 정보(Luggage) 수정
    // 프론트에서 짐 목록(items)을 보냈다면 실행
    if (data.items) {
      // 기존 짐 싹 지우기
      await luggageRepository.destroyByReservId(t, id);

      // 새로운 짐 다시 넣기
      if (data.items.length > 0) {
        const newLuggages = data.items.map(item => ({
          reservId: id, // 현재 예약 ID 연결
          itemType: item.type,
          itemSize: item.size,
          itemWeight: item.weight,
          count: item.count || 1,
        }));
        await luggageRepository.bulkCreate(t, newLuggages);
      }
    }

    // 비회원 정보(Booker) 수정
    // 프론트에서 비회원 정보(bookerInfo)를 보냈다면 실행
    if (data.bookerInfo) {
      const bookerUpdateData = {
        userName: data.bookerInfo.userName,
        phone: data.bookerInfo.phone,
        email: data.bookerInfo.email
      };

      // 비밀번호 암호화
      if (data.bookerInfo.password) {
          // 암호화 후 passwordHash 컬럼에 저장
          bookerUpdateData.passwordHash = await bcrypt.hash(data.bookerInfo.password, 10);
      }

      // DB 업데이트
      await bookerRepository.updateByReservId(t, id, bookerUpdateData);
    }

    await Promise.allSettled(notifications.map(fn => fn()));
    // 업데이트된 최신 정보를 다시 조회해서 반환
    return await reservationRepository.findByPkJoinUser(t, id);
  });
}

/**
 * 예약 삭제
 * @param {number} id - 삭제할 예약 ID
 */
async function destroy(id) {
  // 트랜잭션 시작
  return await db.sequelize.transaction(async t => {
    // 해당 예약 있는지 확인
    const reservation = await reservationRepository.findByPkJoinUser(t, id);

    // 짐 삭제
    await luggageRepository.destroyByReservId(t, id);

    // 비회원 정보 삭제
    await bookerRepository.destroyByReservId(t, id);
    
    // 예약 정보 삭제 <= 부모 테이블이기 때문에 foreignKey가 걸려 있어서 가장 마지막에 삭제해야 함.
    await reservationRepository.destroy(t, id);
  });
  
}

export default {
  pagination,
  show,
  create,
  update,
  destroy,
}