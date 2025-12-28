/**
 * @file app/repositories/reservation.repository.js
 * @description Reservation Repository
 * 251222 v1.0.0 N init
 */

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
 * 예약 상태 업데이트 : 
*/
async function update(t = null, data) {
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
 * 예약코드로 테이블 찾기
 * @returns 
 */
async function findByCode(t = null, reservId) {
  return await Reservation.findOne(
    {
      where: {
        code: reservId
      },
      transaction: t
    }
  )
}

/**
 * 예약코드로 테이블 찾기
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
 * 예약 목록 페이지네이션
 * @param {import("sequelize").Transaction|null} t 
 * @param {{limit: number, offset: number}} data 
 */
async function pagination(t = null, data) {
  // findAndCountAll: 데이터 목록(rows)과 전체 개수(count)를 동시에 가져옴
  return await Reservation.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit: data.limit,
    offset: data.offset,
    include: [
      {
        model: User,
        attributes: ['userName', 'email', 'phone'],
        required: false, // 유저 탈퇴 등으로 정보 없어도 예약 내역은 보여줌
      },
    ],
    transaction: t
  });
};

/**
 * 예약 ID로 조회
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../../app/models/Reservation.js").Id} id 
 */
async function findByPk(t = null, id) {
  return await Reservation.findByPk(
    id,
    {
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'phone'], // 필요한 유저 정보
          required: false,
        },
      ],
      transaction: t,
    }
  );
}


export default {
  create,
  update,
  findByCode,
  findAllByUserId,
  pagination,
  findByPk,
}