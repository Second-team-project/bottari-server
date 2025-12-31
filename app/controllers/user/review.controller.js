/**
 * @file app/controllers/user/review.controller.js
 * @description 후기 관련 컨트롤러
 * 20251231 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";

import reviewService from "../../services/user/review.service.js";

async function index(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인
    const { page, limit } = req.query;

    // 2. 서비스 호출
    const result = await reviewService.index({ page, limit });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

async function show(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인
    const id = req.params.id

    // 2. 서비스 호출
    const result = await reviewService.show(id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  index,
  show,
}