/**
 * @file app/services/admin.auth.service.js
 * @description 관리자 인증 Service
 * 251217 v1.0.0 김민현 init
 */
import jwtUtil from '../../utils/jwt/jwt.util.js';
import db from '../models/index.js';
import adminRepository from '../repositories/admin.repository.js';
import bcrypt from 'bcrypt';

/**
 * 로그인
 * @param {{accountId: string, password: string}}} body 
 * @returns {Promise<import("../models/Admin.js").Admin>}
 */
async function login(body) {
  return await db.sequelize.transaction(async t => {
    const { accountId, password } = body;

    // id로 관리자 정보 획득
    const admin = await adminRepository.findByAccountId(t, accountId);

    // 관리자 존재 여부 체크
    if(!user) {
      throw myError('유저 미존재', NOT_REGISTERED_ERROR);
    }

    // 비밀 번호 체크
    if(!bcrypt.compareSync(password, user.password)) {
      throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR);
    }

    // JWT 생성(accessToken)
    const accessToken = jwtUtil.generateAccessToken(user);

    return {
      admin,
      accessToken,
    }
  })
}

export default {
  login,
}