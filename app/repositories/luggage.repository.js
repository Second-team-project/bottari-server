/**
 * @file app/repositories/booker.repository.js
 * @description booker Repository
 * 251224 v1.0.0 N init
 */

import db from '../models/index.js';
const { Luggage } = db;

/**
 * 예약 정보 생성
 */
async function bulkCreate(t = null, data) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await Luggage.bulkCreate(
    // 배열이기 때문에 reserve.service.js에서 이미 가공한 값을 받음
    data,
    {
      transaction: t
    }
  );
}

export default {
  bulkCreate,
}