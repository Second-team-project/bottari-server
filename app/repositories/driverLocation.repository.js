/**
 * @file app/repositories/driverLocation.repository.js
 * @description DriverLocation Repository
 * 260101 v1.0.0 N init  
 */

import db from '../models/index.js';
const { DriverLocation, Driver, DriverAssignment } = db;

/**
 * 기사 ID로 현재 위치 정보 조회
 */
async function findByDriverId(t = null, driverId) {
  return await DriverLocation.findOne({
    where: { driverId },
    transaction: t
  });
}

/**
 * 위치 정보 업데이트 또는 생성 (Upsert)
 * @param {object} params - { driverId, lat, lng }
 */
async function upsertLocation(t = null, params) {
  const { driverId, lat, lng, reservId } = params;
  // upsert: 없으면 insert, 있으면 update
  return await DriverLocation.upsert({
    driverId,
    lat,
    lng,
    reservId // 선택 사항
  }, { transaction: t });
}

export default {
  findByDriverId,
  upsertLocation,
}  