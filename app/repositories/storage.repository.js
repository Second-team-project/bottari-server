/**
 * @file app/repositories/delivery.repository.js
 * @description Delivery Repository
 * 251222 v1.0.0 N init
 */

import db from '../models/index.js';
const { Storage } = db;

/**
 * 보관 예약 정보 생성
 */
async function create(t = null, data) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await Storage.create(
    {
      reservId: data.reservId,
      price: data.price,
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      storeId: data.storeId,
      notes: data.notes,
    },
    {
      transaction: t
    }
  );
}

async function findByReservId(t = null, reservId) {
  return await Storage.findOne(
    {
      where: {
        reservId: reservId
      },
      transaction: t
    }
  )
}


export default {
  create,
  findByReservId,
}