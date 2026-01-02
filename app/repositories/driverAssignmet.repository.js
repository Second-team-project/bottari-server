/**
 * @file app/repositories/driverAssignmet.repository.js
 * @description driverAssignmet Repository
 * 260102 v1.0.0 N init
 */

import db from '../models/index.js';
const { DriverAssignment, Driver } = db;

/**
 * 예약 ID로 배정된 기사 검색
 */
async function findByReservId(t = null, reservId) {
  return await DriverAssignment.findOne({
    where: { reservId },
    include: [{
      model: Driver,
      as: 'driverAssignmentDriver',
      attributes: ['id', 'driverName', 'phone', 'carNumber']
    }],
    transaction: t
  });
};

export default {
  findByReservId,
}