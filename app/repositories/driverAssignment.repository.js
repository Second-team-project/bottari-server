/**
 * @file app/repositories/driverAssignment.repository.js
 * @description DriverAssignment Repository
 * 251230 v1.0.0 김위민 init
 */

import db from '../models/index.js';
const { DriverAssignment, Delivery, Reservation, Booker, Luggage } = db;

/**
 * 기사 ID에 배정된 모든 예약 정보 및 연관 데이터를 조회
 */
async function findAllAssignedByDriverId(t = null, driverId) {
  return await DriverAssignment.findAll({
    attributes: ['id', 'createdAt'], // 배정 이력 PK
    where: {
      driverId,
      state: 'ASSIGNED' 
    },
    include: [
      {
        model: Reservation,
        as: 'driverAssignmentReservation',
        attributes: ['id', 'state', 'notes'], // 예약 PK, 상태, 요청사항
        required: true,
        include: [
          {
            model: Booker,
            as: 'reservIdBookers',
            attributes: ['userName', 'phone'], // 예약자명, 연락처
            required: true
          },
          {
            model: Delivery,
            as: 'reservIdDeliveries',
            attributes: ['startedAddr', 'endedAddr', 'startedAt'], // 출발지, 도착지, 픽업 시간
            required: true
          },
          {
            model: Luggage,
            as: 'reservIdLuggages',
            attributes: ['itemType', 'itemWeight', 'itemSize', 'count'],
            required: false
          }
        ]
      }
    ],
    order: [['createdAt', 'DESC']],
    transaction: t
  });
}

export default {
  findAllAssignedByDriverId
};