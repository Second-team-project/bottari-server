/**
 * @file app/services/drivers/driver.profile.service.js
 * @description driver profile Service
 * 251226 v1.0.0 김위민 init
 */

import { NOT_REGISTERED_ERROR } from '../../../configs/responseCode.config.js';
import db from '../../models/index.js'
import customError from '../../errors/custom.error.js';
import driverRepository from '../../repositories/driver.repository.js';
import jwtUtil from '../../utils/jwt/jwt.util.js';

/**
 * 기사 개인정보 수정
 * @param {number} driverId - 로그인한 기사 ID
 * @param {{name?: string, phone?: string, carNumber?: string, email?: string}} body
 * @returns {Promise<{driver: import("../../models/Driver.js").Driver>}}
 */
async function updateProfile(driverId, body) {
  return await db.sequelize.transaction(async t => {
    // 기사 정보 조회
    const driver = await driverRepository.findByPk(t, driverId);
    if (!driver) {
      throw customError('유저 미존재', NOT_REGISTERED_ERROR);
    }

    // 수정할 필드 및 로그 준비
    const changes = [];
    for (const key of ['driverName', 'phone', 'carNumber', 'email']) {
      if (body[key] !== undefined && driver[key] !== body[key]) {
        changes.push({
          fieldName: key,
          oldValue: driver[key],
          newValue: body[key]
        });
        driver[key] = body[key]; // 값 수정
      }
    }

    // DB 반영
    await driverRepository.save(t, driver);
    
    // 로그 테이블 기록
    for (const change of changes) {
      await db.DriverEditProfileLog.create({
        driverId: driver.id,
        editFieldName: change.fieldName,
        oldValue: change.oldValue,
        newValue: change.newValue
      }, { transaction: t });
    }
    
    // 엑세스 토큰
    const data = {
      id: driver.id,
      type: 'DRIVER'
    }
    const accessToken = jwtUtil.generateAccessToken(data);
    const refreshToken = jwtUtil.generateRefreshToken(data);

    // 결과 반환
    return {
      driver,
      changes,
      accessToken,
      refreshToken
    };
  });
}

export default {
  updateProfile,
};