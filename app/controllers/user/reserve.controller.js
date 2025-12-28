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

    // 2. 서비스 호출
    const result = await reserveService.deliveryDraft(data);

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
    // console.log('controller-클라이언트에서 받은 데이터: ', data)
    
    // 2. 서비스 호출
    const result = await reserveService.storageDraft(data);
    // console.log('controller-서비스에서 완료한 데이터: ', result)


    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 토스로 결제 승인 요청 보내기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function confirmTossPayment(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인
    const { paymentKey, orderId, amount } = req.body;

    // 2. 서비스 호출 : 금액, 예약 코드로 예약 정보 검증
    const result = await reserveService.confirmTossPayment({ paymentKey, orderId, amount });
    // console.log('controller-toss: ', result)

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
    
  } catch (error) {
    return next(error)
  }
}

/**
 * 결제 완료 후, 예약 정보 조회
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function completePayment(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인 : 파라미터
    const reserveCode = req.params.reserveCode;
    console.log('controller-params: ', reserveCode)
    // 2. 서비스 호출 : =예약 코드로 예약 정보 조회
    const result = await reserveService.completePayment(reserveCode);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    return next(error)
  }
}

async function userReservation(req, res, next) {
  try {
    const id = req.user.id;

    const result = await reserveService.userReservation(id);
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    return next(error)
  }
}

async function guestReservation(req, res, next) {
  try {
    const data = req.body;
    console.log('contoller-guestData: ', data);

    const result = await reserveService.guestReservation(data);
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    return next(error)
  }
}

export default {
  deliveryDraft,
  storageDraft,
  confirmTossPayment,
  completePayment,
  userReservation,
  guestReservation,
}