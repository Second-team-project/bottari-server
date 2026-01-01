/**
 * @file app/repositories/driverLocation.repository.js
 * @description DriverLocation Repository
 * 260101 v1.0.0 N init  
 */

import db from '../models/index.js';
const { DriverLocation, Driver, DriverAssignment } = db;

/**
 * 예약 번호(reservId)로 담당 기사의 현재 위치 조회
 * @param {object} t - transaction
 * @param {number} reservId - 예약 번호
 */
async function findByReservId(t = null, reservId) {
  return await DriverLocation.findOne({
    attributes: ['lat', 'lng', 'updatedAt'],
    subQuery: false,
    include: [
      {
        model: Driver,
        as: 'driverLocationDriver', // DriverLocation.belongsTo(Driver)의 alias
        attributes: [], // 기사 정보는 굳이 안 가져와도 됨 (필요하면 추가)
        required: true, // INNER JOIN (기사가 없으면 위치도 없음)
        include: [
          {
            model: DriverAssignment,
            as: 'driverIdDriverAssignments', // Driver.hasMany(DriverAssignment)의 alias
            where: {
              reservId: reservId,
              // status: 'ACTIVE' // 필요 시 활성 상태인 배정만 조회하는 조건 추가
            },
            required: true // INNER JOIN
          }
        ]
      }
    ],
    transaction: t
  });
}

// findByReservId를 일단 이렇게 바꿔서 테스트
// async function findByReservId(t = null, reservId) {
//   // 1. 먼저 DriverAssignment에서 해당 예약의 driver_id 찾기
//   const assignment = await DriverAssignment.findOne({
//     where: { reservId },
//     attributes: ['driverId']
//   });

//   if (!assignment) return null;

//   // 2. 그 driver_id로 위치 조회
//   return await DriverLocation.findOne({
//     where: { driverId: assignment.driverId },
//     attributes: ['lat', 'lng', 'updatedAt'],
//     transaction: t
//   });
// }

/**
 * 기사 ID로 현재 위치 조회 (기사 앱 등에서 사용 시)
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
  findByReservId,
  findByDriverId,
  upsertLocation,
}  