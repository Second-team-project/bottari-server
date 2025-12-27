/**
 * @file app/controllers/pricing.controller.js
 * @description 요금 관련 컨트롤러
 * 20251224 N init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import customResponse from "../utils/custom.response.util.js";
// ===== services
import pricingService from "../services/pricing.service.js";

async function show(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인

    // 2. 서비스 호출
    const result = await pricingService.show();

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  show,
}