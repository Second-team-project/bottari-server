/**
 * @file app/repositories/reservation.repository.js
 * @description Reservation Repository
 * 251222 v1.0.0 N init
 */

import db from '../models/index.js';
const { Reservation } = db;

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

export default {
  create,
  update,
  findByCode,
  findAllByUserId,
}