/**
 * @file app/controllers/store.controller.js
 * @description 보관소 관련 컨트롤러
 * 20251224 N init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import customResponse from "../utils/custom.response.util.js";
// ===== services
import storeService from "../services/store.service.js";

async function show(req, res, next) {
  try {
    const result = await storeService.show();

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  show,
}