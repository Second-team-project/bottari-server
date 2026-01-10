/**
 * @file app/sevices/admins/admin.users.service.js
 * @description 유저 Service
 * 20260108 N init
 */


import { Op } from 'sequelize';
import db from '../../models/index.js';
import userRepository from '../../repositories/user.repository.js';

/**
 * 유저 정보 페이지네이션
 * @returns 
 */
async function pagination({ page, status, searchType, keyword }) {
  const limit = 20;
  const offset = limit * (page - 1);

  // WHERE 조건 생성
  const where = {};
  
  // 상태 필터링 (전체가 아닐 때만)
  if(status && status !== '전체') {
    where.status = status;
  }

  // 검색 (검색어와 타입이 모두 있을 때)
  if(keyword && searchType) {
    where[searchType] = { [Op.like]: `%${keyword}%` };
  }

  const result = await userRepository.pagination(null, { where, offset, limit });

  return result;
}

/**
 * 유저 상세 조회
 * @returns 
 */
async function show({ id }) {

  const result = await userRepository.findByPkJoinReservation(null, { id });

  return result;
}

/**
 * 유저 수정
 * @returns 
 */
async function update({ id, status, adminMemo }) {
  return await db.sequelize.transaction(async t => {
    const result = await userRepository.update(t, { id, status, adminMemo });
    
    return result;
  })
}

/**
 * 유저 삭제
 * @returns 
 */
async function destroy({ id }) {
  return await db.sequelize.transaction(async t => {
    const result = await userRepository.destroy(t, { id });
    
    return result;
  })
}

export default {
  pagination,
  show,
  update,
  destroy,
}