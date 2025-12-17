/**
 * @file app/services/admin.auth.service.js
 * @description 관리자 인증 Service
 * 251217 v1.0.0 김민현 init
 */
import db from '../models/index.js';
import adminRepository from '../repositories/admin.repository.js';

/**
 * 로그인
 * @param {{accountId: string, password: string}}} body 
 * @returns {Promise<import("../models/Admin.js").Admin>}
 */
async function login(body) {
  return await db.sequelize.transaction(async t => {
    const { accountId, password } = body;

    const admin = await adminRepository.findByAccountId(t, accountId);

    // 존재 여부 체크

    // 비밀 번호 체크

    // JWT 생성(accessToken)

    return {
      admin,
    }
  })
}

export default {
  login,
}