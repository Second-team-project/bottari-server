/**
 * @file app/controllers/drivers/driver.attendance.controller.js
 * @description 출퇴근 컨트롤러
 * 251227 v1.0.0 김위민 init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import driverAttendanceService from "../../services/drivers/driver.attendance.service.js";
import customResponse from "../../utils/custom.response.util.js";

/**
 * 초기 로드 시 상태 조회 컨트롤러
 */
async function getAttendanceStatus(req, res, next) {
  try {
    const driverId = req.user.id;

    const result = await driverAttendanceService.getAttendanceStatus(driverId);
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    next(error);
  }
}

/**
 * 출퇴근 토글 실행 컨트롤러
 */
async function handleAttendance(req, res, next) {
  try {
    const driverId = req.user.id;
    const { nextState } = req.body; // 'CLOCKED_IN' 또는 'CLOCKED_OUT'

    const result = await driverAttendanceService.toggleAttendance(driverId, nextState);
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    next(error);
  }
}

export default { 
  getAttendanceStatus, 
  handleAttendance 
};