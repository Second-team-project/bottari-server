/**
 * @file app/repositories/driverAttendanceLog.repository.js
 * @description driverAttendanceLog Repository
 * 251227 v1.0.0 김위민 init
 */

import db from '../models/index.js';
const { DriverAttendanceLog } = db;

/**
 * 가장 최근의 퇴근하지 않은 출근 기록 조회
 */
async function findLastActiveLog(t = null, driverId) {
  return await DriverAttendanceLog.findOne({
    where: {
      driverId,
      clockOutAt: null,
    },
    order: [['createdAt', 'DESC']],
    transaction: t
  });
}

/**
 * 새로운 출퇴근 로그 생성
 */
async function createLog(t = null, data) {
  return await DriverAttendanceLog.create(data, { transaction: t });
}

/**
 * 로그 업데이트 (퇴근 처리용)
 */
async function save(t = null, logInstance) {
  return await logInstance.save({ transaction: t });
}

/**
 * 해당 기사의 가장 마지막 출근 기록
 */
async function findActiveAttendanceLog(t = null, driverId) {
  return await DriverAttendanceLog.findOne({
    attributes: ['state'],
    where: { driverId },
    order: [['createdAt', 'DESC']],
  })
}

export default {
  findLastActiveLog,
  createLog,
  save,
  findActiveAttendanceLog
};