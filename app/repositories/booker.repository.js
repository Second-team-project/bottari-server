/**
 * @file app/repositories/booker.repository.js
 * @description booker Repository
 * 251224 v1.0.0 N init
 */

import db from '../models/index.js';
const { Booker } = db;

/**
 * 예약 정보 생성
 */
async function create(t = null, data) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await Booker.create(
    {
      reservId: data.reservId,
      userId: data.userId,
      userName: data.userName,
      phone: data.phone,
      email: data.email,
      passwordHash: data.passwordHash,
    },
    {
      transaction: t
    }
  );
}

export default {
  create,
}