/**
 * @file app/services/driver/driver.location.service.js
 * @description 기사 GPS Service
 * 250101 N init
 */

import { NO_ASSIGNMENT_ERROR } from "../../../configs/responseCode.config.js";
import customError from "../../errors/custom.error.js";

import db from "../../models/index.js";

import driverAssignmetRepository from "../../repositories/driverAssignmet.repository.js";
import driverLocationRepository from "../../repositories/driverLocation.repository.js";
import driverLocationLogRepository from "../../repositories/driverLocationLog.repository.js";

/**
 * 예약 조회 페이지(예약 코드)에서 기사 위치 조회
 */
async function show(reservId) {
  const driverAssignment = await driverAssignmetRepository.findByReservId(null, reservId);
  console.log('service-driverAssignment: ', driverAssignment);

  if (!driverAssignment) {
    throw customError('배정 정보 없음', NO_ASSIGNMENT_ERROR);
  };

  const driverLocation = await driverLocationRepository.findByDriverId(null, driverAssignment.driverId);
  console.log('service-driverLocation: ', driverLocation);

  return {
    driverId: driverAssignment.driverId,
    assignedAt: driverAssignment.assignedAt,
    state: driverAssignment.state,

    driverName: driverAssignment.driverAssignmentDriver.driverName,
    phone: driverAssignment.driverAssignmentDriver.phone,
    carNumber: driverAssignment.driverAssignmentDriver.carNumber,

    lat: driverLocation?.lat ?? null,
    lng: driverLocation?.lng ?? null,
  }
}

async function updateLocation({ driverId, lat, lng }) {
  return await db.sequelize.transaction(async t => {
    await driverLocationRepository.upsert(t, { driverId, lat, lng });

    await driverLocationLogRepository.create(t, { driverId, lat, lng });
  })
}

export default {
  show,
  updateLocation,
}