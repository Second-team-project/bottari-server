/**
 * @file app/repositories/driverLocationLog.repository.js
 * @description DriverLocationLog Repository
 * 260105 v1.0.0 N init  
 */

import db from '../models/index.js';
const { DriverLocationLogs } = db;

/**
 * 기사 ID로 현재 위치 정보 로그에 저장
 */
async function create(t = null, { driverId, lat, lng }) {
  return await DriverLocationLogs.create(
    {
      driverId,
      lat,
      lng
    },
    {
      transaction: t
    }
  );
}

export default {
  create,
}  