/**
 * @file app/services/drivers/driver.auth.service.js
 * @description driver auth Service
 * 251222 v1.0.0 김위민 init
 */

import bcrypt from 'bcrypt';
import { NOT_REGISTERED_ERROR, REISSUE_ERROR } from '../../../configs/responseCode.config.js';
import jwtUtil from '../../utils/jwt/jwt.util.js';
import db from '../../models/index.js'
import driverRepository from '../../repositories/driver.repository.js';
import customError from '../../errors/custom.error.js';

/**
 * 로그인
 * @param {{emali: string, password: string}}} body 
 * @returns {Promise<import("../models/Driver.js").Driver>}
 */
async function driverLogin(body) {
  return await db.sequelize.transaction(async t => {
    const { id, password } = body;
  
    // id로 유저 정보 획득
    const driver = await driverRepository.findByAccountId(t, id);
  
    //유저 존재 여부 체크
    if(!driver) {
      throw customError('유저 미존재', NOT_REGISTERED_ERROR);
    }
  
    // 비밀번호 체크
    // compare : 비동기 처리 / compareSync : 동기 처리
    if(!bcrypt.compareSync(password, driver.passwordHash)) {
      throw customError('비밀번호 틀림', NOT_REGISTERED_ERROR);
    }
    
    // JWT 생성(accessToken, refreshToken)
    const data = {
      id: driver.id,
      type: 'DRIVER'
    }
    const accessToken = jwtUtil.generateAccessToken(data);
    const refreshToken = jwtUtil.generateRefreshToken(data);
  
    // refreshToken 저장
    driver.refreshToken = refreshToken;
    await driverRepository.save(t, driver);
  
    return {
      accessToken,
      refreshToken,
      driver
    };
  });
}

/**
 * 토큰 재발급 처리
 * @param {string} token 
 */
async function driverReissue(token) {
  // 토큰 검증 및 유저id 획득
  const claims = jwtUtil.getClaimsWithVerifyToken(token);
  const driverId = claims.sub;

  return await db.sequelize.transaction(async t => {
    // 유저 정보 획득
    const driver = await driverRepository.findByPk(t, driverId);

    // 토큰 일치 검증
    if(token !== driver.refreshToken) {
      throw customError('리프래시 토큰 불일치', REISSUE_ERROR);
    }

    // JWT 생성
    const accessToken = jwtUtil.generateAccessToken(driver);
    const refreshToken = jwtUtil.generateRefreshToken(driver);

    // 리프래시 토큰 DB에 저장
    driver.refreshToken = refreshToken;
    await driverRepository.save(t, driver);

    return {
      accessToken,
      refreshToken,
      driver
    }
  });
}

export default {
  driverLogin,
  driverReissue,
}