/**
 * @file app/repositories/delivery.repository.js
 * @description Delivery Repository
 * 251222 v1.0.0 N init
 */

import db from '../models/index.js';
const { Delivery } = db;

/**
 * 배송 예약 정보 생성
 */
async function create(t = null, data) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await Delivery.create(
    {
      reservId: data.reservId,
      price: data.price,
      startedAt: data.startedAt,
      startedAddr: data.startedAddr,
      endedAddr: data.endedAddr,
      notes: data.notes,
    },
    {
      transaction: t
    }
  );
}

async function findByReservId(t = null, id) {
  return await Delivery.findOne(
    {
      where: {
        reservId: id
      },
      transaction: t
    }
  )
}

export default {
  create,
  findByReservId,
}