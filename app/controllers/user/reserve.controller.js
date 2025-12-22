/**
 * @file app/controllers/user/reserve.controller.js
 * @description 예약 관련 컨트롤러
 * 20251221 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";

import reserveService from "../../services/user/reserve.service.js";


async function draft(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인
    const data = req.body;
    // console.log('controller-data: ', data)

    // 2. 서비스 호출
    const result = await reserveService.draft(data);
    console.log('controller-result: ', result)

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  draft,
}