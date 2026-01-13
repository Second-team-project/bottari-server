/**
 * @file app/repositories/driverAssignment.repository.js
 * @description DriverAssignment Repository
 * 251230 v1.0.0 김위민 init
 */

import { Op } from 'sequelize';
import db from '../models/index.js';
const { DriverAssignment, Delivery, Reservation, Booker, Luggage } = db;

/**
 * 기사 ID에 배정된 오늘의 예약 정보 및 연관 데이터를 조회
 */
async function findTodayAssignedByDriverId(t = null, driverId, startDate, endDate) {
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
              startedAt: {
                [Op.between]: [startDate, endDate]
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

/**
 * 실적 조회
 */
async function countCompletedDeliveries(driverId, startDate, endDate) {
  return await DriverAssignment.count({
    where: {
      driverId,
      state: 'ASSIGNED'
    },
    include: [
      {
        model: Reservation,
        as: 'driverAssignmentReservation',
        where: { state: 'COMPLETED' },
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

/**
 * 배송 상태 업데이트
 */
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