/**
 * @file app/repositories/driverAssignment.repository.js
 * @description DriverAssignment Repository
 * 251230 v1.0.0 김위민 init
 */

import { Op, where } from 'sequelize'; // Op 추가
import dayjs from 'dayjs';
import db from '../models/index.js';
import DriverAttendanceLog from '../models/DriverAttendanceLog.js';
const { DriverAssignment, Delivery, Reservation, Booker, Luggage } = db;

/**
 * 기사 ID에 배정된 오늘의 예약 정보 및 연관 데이터를 조회
 */
async function findTodayAssignedByDriverId(t = null, driverId) {
  // 오늘 날짜의 시작과 끝 설정
  const todayStart = dayjs().startOf('day').toDate();
  const todayEnd = dayjs().endOf('day').toDate();

  return await DriverAssignment.findAll({
    attributes: ['id', 'createdAt'],
    where: {
      driverId,
      state: 'ASSIGNED' 
    },
    include: [
      {
        model: Reservation,
        as: 'driverAssignmentReservation',
        attributes: ['id', 'state', 'notes'],
        required: true,
        include: [
          {
            model: Booker,
            as: 'reservIdBookers',
            attributes: ['userName', 'phone'],
            required: true
          },
          {
            model: Delivery,
            as: 'reservIdDeliveries',
            attributes: ['startedAddr', 'endedAddr', 'startedAt'],
            required: true,
            where: {
              // 오늘 날짜 데이터만 필터링
              startedAt: {
                [Op.between]: [todayStart, todayEnd]
              }
            }
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

async function countCompletedDeliveries(driverId, startDate, endDate) {
  return await DriverAssignment.count({
    where: {
      driverId,
      state: 'ASSIGNED' // 배정된 상태이면서
    },
    include: [
      {
        model: Reservation,
        as: 'driverAssignmentReservation',
        where: { state: 'COMPLETED' }, // 예약 상태가 완료인 것
        required: true,
        include: [
          {
            model: Delivery,
            as: 'reservIdDeliveries',
            required: true,
            where: {
              startedAt: { [Op.between]: [startDate, endDate] }
            }
          }
        ]
      }
    ]
  });
}

// 상태 업데이트 함수 추가
async function updateReservationState(t = null, reservationId, nextState) {
  return await Reservation.update(
    { state: nextState },
    { where: { id: reservationId }, transaction: t }
  );
}

export default {
  findTodayAssignedByDriverId,
  countCompletedDeliveries,
  updateReservationState,
};