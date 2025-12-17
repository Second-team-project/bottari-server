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

export default {
  findByAccountId,
  save,
}