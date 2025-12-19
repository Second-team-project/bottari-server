/**
 * @file app/repositories/admin.repository.js
 * @description Admin Repository
 * 251217 v1.0.0 김민현 init
 */

import db from '../models/index.js';
const { Admin } = db;

/**
 * accountId로 관리자 검색
 * @param {import("sequelize").Transaction} transaction 
 * @param {string} accountId 
 * @returns 
 */
async function findByAccountId(transaction = null, accountId) {
  return await Admin.findOne(
    {
      where: {
        accountId: accountId
      },
      transaction: transaction
    }
  );
}

/**
 * Admin 모델 인스턴스로 save 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js").Admin} admin
 * @returns 
 */
async function save(t = null, admin) {
  return await admin.save({ transaction: t });
}

/**
 * 관리자 id로 조회
 * @param {import("sequelize").Transaction} t 
 * @param {number} id
 * @returns {Promise<import("../models/Admin.js").Admin>}
 */
async function findByPk(t = null, id) {
  return await Admin.findByPk(id, { transaction:t });
}

async function create(t = null, data) {
  return await Admin.create(data, { transaction: t });
}

async function logout(t = null, id) {
  // 특정 유저 리프래쉬토큰 null로 갱신
  return await Admin.update(
    {
      refreshToken: null,
    },
    {
      where: {
        id: id // 앞 id는 컬럼, 뒤 id는 파라미터로 받은 id
      },
      transaction: t
    }
  );
}

export default {
  findByAccountId,
  save,
  findByPk,
  create,
  logout,
}