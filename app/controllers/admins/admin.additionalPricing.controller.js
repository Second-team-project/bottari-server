/**
 * @file app/controllers/admins/admin.additionalPricing.controller.js
 * @description 추가 요금 관련 컨트롤러
 * 20260106 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
// ===== services
import additionalPricingService from "../../services/admins/admin.additionalPricing.service.js";

/**
 * 추가 요금 전부 가져오기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function index(req, res, next) {
  try {
    const result = await additionalPricingService.index();

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 추가 요금 생성
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function store(req, res, next) {
  try {
    const data = req.body;

    const result = await additionalPricingService.store({
      serviceType: data.serviceType,
      minValue: data.minValue, 
      maxValue: data.maxValue, 
      rate: data.rate,
    });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 추가 요금 수정
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function update(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await additionalPricingService.update({
      id,
      serviceType: data.serviceType,
      minValue: data.minValue, 
      maxValue: data.maxValue, 
      rate: data.rate,
    });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

async function destroy(req, res, next) {
  try {
    const id = req.params.id;

    const result = await additionalPricingService.destroy(id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  index,
  store,
  update,
  destroy,
}