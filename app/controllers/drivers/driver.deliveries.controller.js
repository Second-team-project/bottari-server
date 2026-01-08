/**
 * @file app/controllers/drivers/driver.deliveries.controller.js
 * @description 배정된 예약 정보 컨트롤러
 * 251230 v1.0.0 김위민 init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
import driverDeliveriesService from "../../services/drivers/driver.deliveries.service.js";

/**
 * 기사에게 배정된 배송 내역 조회 컨트롤러
 */
async function getAssignedDeliveries(req, res, next) {
  try {
    const driverId = req.user.id;

    const result = await driverDeliveriesService.getAssignedDeliveries(driverId);
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    next(error);
  }
}

/**
 * 배송 상태 변경 컨트롤러
 */
async function updateDeliveryState(req, res, next) {
  try {
    const { resId, currentState } = req.body;

    const driverId = req.user.id;
    
    // 서비스 호출하여 상태 변경 로직 수행
    const result = await driverDeliveriesService.updateDeliveryState(driverId, resId, currentState);
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    next(error);
  }
}

export default { 
  getAssignedDeliveries,
  updateDeliveryState
};