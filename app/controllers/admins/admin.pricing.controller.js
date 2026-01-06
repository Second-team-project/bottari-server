/**
 * @file app/controllers/pricing.controller.js
 * @description 요금 관련 컨트롤러
 * 20251224 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
// ===== services
import pricingService from "../../services/admins/admin.pricing.service.js";

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
 * 요금 생성
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function store(req, res, next) {
  try {
    const data = req.body;
    console.log('controller-data: ', data);

    const result = await pricingService.store({
      serviceType: data.serviceType,
      itemType: data.itemType,
      itemSize: data.itemSize, 
      itemWeight: data.itemWeight, 
      basePrice: data.basePrice,
    });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 요금 추가
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function update(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await pricingService.update({
      id,
      serviceType: data.serviceType,
      itemType: data.itemType,
      itemSize: data.itemSize, 
      itemWeight: data.itemWeight, 
      basePrice: data.basePrice,
    });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 요금 삭제
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function destroy(req, res, next) {
  try {
    const id = req.params.id;

    const result = await pricingService.destroy(id);

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