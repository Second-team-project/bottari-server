/**
 * @file app/services/admin.auth.service.js
 * @description 관리자 인증 Service
 * 251217 v1.0.0 김민현 init
 */
import customError from '../../errors/custom.error.js';
import jwtUtil from '../../utils/jwt/jwt.util.js';
import db from '../../models/index.js';
import adminRepository from '../../repositories/admin.repository.js';
import bcrypt from 'bcrypt';
import { NOT_REGISTERED_ERROR, REISSUE_ERROR } from '../../../configs/responseCode.config.js';

/**
 * 로그인
 * @param {{accountId: string, password: string}}} body 
 * @returns {Promise<import("../models/Admin.js").Admin>}
 */
async function login(body) {
  // 트랜잭션 처리
  return await db.sequelize.transaction(async t => {
    const { accountId, password } = body;

    // id로 관리자 정보 획득
    const admin = await adminRepository.findByAccountId(t, accountId);

    // 관리자 존재 여부 체크
    if(!admin) {
      throw customError('해당 관리자 없음', NOT_REGISTERED_ERROR);
    }

    // 비밀 번호 체크
    if(!bcrypt.compareSync(password, admin.passwordHash)) {
      throw customError('비밀번호 틀림', NOT_REGISTERED_ERROR);
    }

    // JWT 생성(accessToken)
    const data = {
      id: admin.accountId,
      type: 'ADMIN'
    }
    const accessToken = jwtUtil.generateAccessToken(data);
    const refreshToken = jwtUtil.generateRefreshToken(data);

    return {
      admin,
      accessToken,
      refreshToken,
    }
  });
}

/**
 * 로그아웃 처리
 * @param {number} id - 관리자 id
 */
async function logout(id) {
  return await adminRepository.logout(null, id);
}

/**
 * 토큰 재발급 처리
 * @param {string} token 
 */
async function reissue(token) {
  // 토큰 검증 및 관리자 id 획득
  const claims = jwtUtil.getClaimsWithVerifyToken(token);
  const accountId = claims.sub;

  return await db.sequelize.transaction(async t => {
    // 유저 정보 획득
    const admin = await adminRepository.findByPk(t, accountId);

    // 토큰 일치 검증
    if(token !== admin.refreshToken) {
      throw customError('리프래쉬 토큰 불일치', REISSUE_ERROR);
    }

    // JWT 생성
    const data = {
      id: admin.accountId,
      type: 'ADMIN'
    }

    const accessToken = jwtUtil.generateAccessToken(data);
    const refreshToken = jwtUtil.generateRefreshToken(data);

    // 리프래쉬 토큰 DB에 저장
    admin.refreshToken = refreshToken; // <= 이전 리프래쉬 토큰을 갱신
    await adminRepository.save(t, admin); // <= Admin 모델 갱신

    return {
      accessToken,
      refreshToken,
      admin
    }
  });
}

export default {
  login,
  logout,
  reissue,
}