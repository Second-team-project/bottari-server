/**
 * @file app/controllers/pricing.controller.js
 * @description 요금 관련 컨트롤러
 * 20251224 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
// ===== services
import pricingService from "../../services/admins/pricing.service.js";

/**
 * 기본 요금 가져오기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function index(req, res, next) {
  try {
    const result = await pricingService.index();

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 추가 요금 가져오기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function indexAdditional(req, res, next) {
  try {
    const result = await pricingService.indexAdditional();

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  index,
  indexAdditional,
}