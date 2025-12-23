/**
 * @file app/controllers/user/reserve.controller.js
 * @description 예약 관련 컨트롤러
 * 20251221 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";

import reserveService from "../../services/user/reserve.service.js";


/**
 * delivery 결제 전 임시 저장
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function deliveryDraft(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인
    const data = req.body;
    // console.log('controller-data: ', data)

    // 2. 서비스 호출
    const result = await reserveService.deliveryDraft(data);
    console.log('controller-deliver: ', result)

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * storage 결제 전 임시 저장
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function storageDraft(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인
    const data = req.body;
    // console.log('controller-data: ', data)

    // 2. 서비스 호출
    const result = await reserveService.storageDraft(data);
    console.log('controller-storage: ', result)

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

async function confirmPayment(req, res, next) {
  try {
    // 클라이언트 데이터로 서비스 호출

    // 결과 받기



    
  } catch (error) {
    return next(error)
  }
}

export default {
  deliveryDraft,
  storageDraft,
  confirmPayment,
}