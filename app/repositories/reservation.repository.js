/**
 * @file app/repositories/reservation.repository.js
 * @description Reservation Repository
 * 251222 v1.0.0 N init
 */

import { Op } from 'sequelize';
import db from '../models/index.js';
const { Reservation, User } = db;

/**
 * 예약 정보 생성
 */
async function create(t = null, data) {
  // CRATE * FROM reservation ;
  return await Reservation.create(
    {
      userId: data.userId,
      code: data.code ,
      state: "PENDING_PAYMENT",
      price: data.price
    },
    {
      transaction: t
    }
  );
}

/**
 * 예약 상태 업데이트 : 결제 대기 -> 예약 완료
*/
async function updateToReserved(t = null, data) {
  // SELECT
  return await Reservation.update(
    {
      state: data.state,
      paymentKey: data.paymentKey,
      paymentMethod: data.paymentMethod,
      approvedAt: data.approvedAt,
    },
    {
      where: {
        code: data.code,
      },
      transaction: t,
    }
  )
}

/**
 * 예약 상태 업데이트 : 예약 완료 -> 취소
*/
async function updateToCancel(t = null, data) {
  // SELECT
  return await Reservation.update(
    {
      state: data.state,
      cancelReason: data.reason,
    },
    {
      where: {
        id: data.id,
      },
      transaction: t,
    }
  )
}

/**
 * 예약 번호로 레코드 찾기
*/
async function findByPk(t = null, reservId) {
  // SELECT
  return await Reservation.findOne(
    {
      where: {
        id: reservId,
      },
      transaction: t,
    }
  )
}

/**
 * 예약 번호들(배열)로 예약 정보들 찾기 
 * @param {*} t 
 * @param {*} reservId 
 * @returns 
 */
async function findByPks(t = null, reservIds) {
  return await Booker.findAll(
    {
      where: {
        reservId: reservIds
      },
      transaction: t
    }
  )
}

/**
 * 예약코드로 테이블 찾기
 * @returns 
 */
async function findByCode(t = null, reservCode) {
  return await Reservation.findOne(
    {
      where: {
        code: reservCode
      },
      transaction: t
    }
  )
}

/**
 * user_id 로 전체 조회
 * @returns 
 */
async function findAllByUserId(t = null, userId) {
  return await Reservation.findAll(
    {
      where: {
        userId: userId,
      },
      order: [
        ['createdAt', 'DESC']
      ],
      transaction: t
    }
  )
}

/**
 * 예약 목록 페이지네이션(검색 및 필터 적용)
 * @param {import("sequelize").Transaction|null} t 
 * @param {{limit: number, offset: number, filters: Object}} data
 */
async function pagination(t = null, { limit, offset, filters }) {
  // 1. 기본 Where 조건 선언 (빈 객체)
  const where = {};

  // 2. 동적 쿼리 조립
  if (filters) {
    // 2-1. 예약 상태 필터 (값이 있을 때만 조건 추가)
    if (filters.state) {
      where.state = filters.state;
    }

    // 2-2. 예약 코드 검색
    if (filters.searchType === 'code' && filters.keyword) {
      where.code = { [Op.like]: `%${filters.keyword}%` };
    }

    // 2-3. 날짜 범위 조회 (createdAt 기준)
    if (filters.startDate && filters.endDate) {
      where.createdAt = {
        [Op.between]: [filters.startDate, filters.endDate]
      };
    }
  }

  // 3. 쿼리 실행
  return await Reservation.findAndCountAll({
    where: where, // 위에서 만든 조건 주입
    order: [['createdAt', 'DESC']],
    limit: limit,
    offset: offset,
    include: [
      {
        model: User,
        as: 'reservationUser',
        attributes: ['userName', 'email', 'phone'],
        required: false, 
        // 2-4. 예약자 이름(회원) 검색 조건
        where: (filters && filters.searchType === 'userName' && filters.keyword) 
          ? { userName: { [Op.like]: `%${filters.keyword}%` } } 
          : undefined
      },
    ],
    distinct: true, // include와 limit을 같이 쓸 때 정확한 개수를 세기 위해 필수
    transaction: t
  });
};

/**
 * 예약 ID로 조회 + users 테이블 JOIN
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../../app/models/Reservation.js").Id} id 
 */
async function findByPkJoinUser(t = null, id) {
  return await Reservation.findByPk(
    id,
    {
      include: [
        {
          model: User,
          as: 'reservationUser',
          attributes: ['userName', 'email', 'phone'], // 필요한 유저 정보
          required: false,
        },
      ],
      transaction: t,
    }
  );
}

/**
 * 예약 ID로 정보 수정
 */
async function updateByPk(t = null, id, updateData) {
  return await Reservation.update(updateData, {
    where: {
      id: id
    }, // PK로 찾아서 수정
    transaction: t
  });
}

/**
 * 예약 삭제 (Soft Delete)
 * @param {Object|null} t
 * @param {number} id - 예약 PK
 */
async function destroy(t = null, id) {
  return await Reservation.destroy({
    where: {
      id: id
    },
    transaction: t
  });
}


export default {
  create,
  findByPk,
  findByPks,
  findByCode,
  findAllByUserId,

  updateToReserved,
  updateToCancel,

  pagination,
  findByPkJoinUser,
  updateByPk,
  destroy,
}