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
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await Reservation.create(
    {
      userId: data.userId,
      code: data.code ,
      state: "PENDING_PAYMENT",
    },
    {
      transaction: t
    }
  );
}

export default {
  create,
}