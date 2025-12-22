/**
 * @file app/controllers/user/search.controller.js
 * @description 인증 관련 컨트롤러
 * 20251217 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";

import searchService from "../../services/user/search.service.js";

async function location(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인
    const keyword = req.query?.keyword
    const page = req.query?.page

    // 2. 서비스 호출
    const result = await searchService.location({keyword, page});

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  location,
}