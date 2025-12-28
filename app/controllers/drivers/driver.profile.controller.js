/**
 * @file app/controllers/drivers/driver.profile.controller.js
 * @description 개인정보 컨트롤러
 * 251226 v1.0.0 김위민 init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import driverProfileService from "../../services/drivers/driver.profile.service.js";
import cookieUtil from "../../utils/cookie/cookie.util.js";
import customResponse from "../../utils/custom.response.util.js";

// ----------------
// ---- public ----
// ----------------
/**
 * 개인정보 수정 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function driverEditProfile(req, res, next) {
  try {
    const driverId = req.user.id; // 로그인한 기사 ID
    const updatedData = req.body;
    
    const result = await driverProfileService.updateProfile(driverId, updatedData);
    const { accessToken, refreshToken, driver } = result; // 구조 분해 할당으로 꺼내기

    if (refreshToken) {
      cookieUtil.setCookieRefreshToken(res, refreshToken);
    }

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));   
  } catch(error) {
    next(error);
  }
}

// --------------
// export
// --------------
export default {
  driverEditProfile,
};