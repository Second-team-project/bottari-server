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

/**
 * 예약 번호로 예약자 찾기
 * @param {*} t 
 * @param {*} reservId 
 * @returns 
 */
async function findByReservId(t = null, reservId) {
  return await Booker.findOne(
    {
      where: {
        reservId: reservId
      },
      transaction: t
    }
  )
}

/**
 * 예약 번호로 비회원 정보 수정
 */
async function updateByReservId(t = null, reservId, updateData) {
  return await Booker.update(updateData, {
    where: {
      reservId: reservId // (reserv_id 컬럼 매핑)
    },
    transaction: t
  });
}

/**
 * 예약 번호들(배열)로 예약자 찾기 
 * @param {*} t 
 * @param {*} reservId 
 * @returns 
 */
async function findByReservIds(t = null, reservIds) {
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
 * 특정 예약의 비회원 정보 삭제
 */
async function destroyByReservId(t, reservId) {
  return await Booker.destroy({
    where: {
      reservId: reservId
    }, // 모델의 reservId 컬럼 사용
    transaction: t
  });
}

export default {
  create,
  findByReservId,
  findByReservIds,
  updateByReservId,
  destroyByReservId,
}