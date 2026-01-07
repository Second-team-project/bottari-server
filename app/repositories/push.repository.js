/**
 * @file app/repositories/push.repository.js
 * @description push Repository
 * 251224 v1.0.0 N init
 */

import db from '../models/index.js';
const { Push } = db;

async function upsert(t = null, data) {
  return await Push.upsert(
    data, 
    { 
      transaction : t 
    }
  );
}

async function findAllByUserId(id, type) {
  // 유저 타입에 따라 검색 조건 설정 (userId, driverId 등)
  const whereClause = {};

  if (type === 'MEMBER') whereClause.userId = id;
  if (type === 'DRIVER') whereClause.driverId = id;
  if (type === 'ADMIN') whereClause.adminId = id;
  
  return await Push.findAll({ where: whereClause });
}

export default {
  upsert,
  findAllByUserId
}