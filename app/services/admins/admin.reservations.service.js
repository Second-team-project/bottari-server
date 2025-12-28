/**
 * @file app/services/admin.reservations.service.js
 * @description 관리자 예약 관리 service
 * 251224 v1.0.0 김민현 init
 */
import { UNMATCHING_USER_ERROR } from "../../../configs/responseCode.config.js";
import customError from "../../errors/custom.error.js";
import db from "../../models/index.js";
import reservationRepository from "../../repositories/reservation.repository.js";
import luggageRepository from "../../repositories/luggage.repository.js";
import reserveCodeUtil from "../../utils/reserveCode/reserve.code.util.js";
import bookerRepository from "../../repositories/booker.repository.js";

/**
 * 예약 목록 페이지네이션
 * @param {import("./").page} page - 페이지 번호
 * @returns {Promise<Array<import("../../models/Reservation.js").Reservation>}
 */
async function pagination(page) {
  const limit = 6;
  const offset = limit * (page - 1);
  
  return await reservationRepository.pagination(null, { limit, offset });
}

/**
 * 예약 목록 상세
 * @param {number} id - 예약 ID
 * @returns {Promise<import("../../models/Reservation.js").Reservation>}
 */
async function show(id) {
  return await reservationRepository.findByPk(null, id);
}

/**
 * 예약 등록
 * @returns {Promise<import("../../models/Reservation.js").Reservation>}
 */
async function create(data) {
  const result = db.sequelize.transaction(async t => {
    // 유저 타입
    const userTypeKey = data.userId ? 'MEMBER' : 'GUEST';

    // 예약 코드 생성
    const codeData = {
      type: data.serviceType,
      userType: userTypeKey,
    }

    const reservationCode = reserveCodeUtil.createReserveCode(codeData);

    // 예약 데이터 생성
    const createData = {
      userId: data.userId || null,
      price: data.price,
      notes: data.notes,
      code: reservationCode,
      state: 'PENDING_PAYMENT',
    };
      const newReservation = await reservationRepository.create(t, createData);

      if(data.items && data.items.length > 0) {
          const luggageList = data.items.map(item => ({
          ...item,
          reservId: newReservation.id,
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

      return newReservation;
  });
}

/**
 * 예약 삭제
 *
 */
async function destroy({ adminId, noticeId }) {
  // 트랜잭션 시작
  return await db.sequelize.transaction(async t => {
    // (게시글 작성자 일치 확인용)
    const notice = await reservationRepository.findByPk(t, noticeId);

    // 게시글 작성자 일치 확인
    if(notice.adminId !== adminId) {
      throw customError('작성자 불일치', UNMATCHING_USER_ERROR);
    }
    
    // 게시글 삭제 <= 부모 테이블이기 때문에 foreignKey가 걸려 있어서 가장 마지막에 삭제해야 함.
    await noticeRepository.destroy(t, noticeId);
  });
  
}

export default {
  pagination,
  show,
  create,
  destroy,
}