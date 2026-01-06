/**
 * @file app/controllers/driver/driver.location.controller.js
 * @description 기사 GPS 관련 컨트롤러
 * 20250101 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
// ===== services
import driverLocationService from "../../services/drivers/driver.location.service.js";

async function show(req, res, next) {
  try {
    const id = req.params.id;
    const result = await driverLocationService.show(id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

async function updateLocation(req, res, next) {
  try {
    const driverId = req.user.id;
    const { lat, lng } = req.body;
    // console.log('controller-id, lat, lng: ', id, lat, lng);

    const result = await driverLocationService.updateLocation({ driverId, lat, lng });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
    
  } catch (error) {
    return next(error)
  }
}

export default {
  show,
  updateLocation,
}