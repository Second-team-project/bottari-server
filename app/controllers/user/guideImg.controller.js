/**
 * @file app/controllers/user/guideImg.controller.js
 * @description 가이드이미지 관련 컨트롤러
 * 20250101 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
// ===== services
import guideImgService from "../../services/user/guideImg.service.js";

async function index(req, res, next) {
  try {

    const result = await guideImgService.index();

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  index,
}