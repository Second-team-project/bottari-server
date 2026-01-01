/**
 * @file app/services/driver/driver.location.service.js
 * @description 기사 GPS Service
 * 250101 N init
 */

import driverLocationRepository from "../../repositories/driverLocation.repository.js";

/**
 * 예약 조회 페이지(예약 코드)에서 기사 위치 조회
 */
async function show(id) {
  const result = await driverLocationRepository.findByReservId(null, id);

  return result;
}

export default {
  show,
}