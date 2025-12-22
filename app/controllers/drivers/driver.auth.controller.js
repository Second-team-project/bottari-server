/**
 * @file app/controllers/drivers/driver.auth.controller.js
 * @description 인증 관련 컨트롤러
 * 251222 v1.0.0 김위민 init
 */

import { REISSUE_ERROR, SUCCESS } from "../../../configs/responseCode.config.js";
import customError from "../../errors/custom.error.js";
import driverAuthService from "../../services/drivers/driver.auth.service.js";
import cookieUtil from "../../utils/cookie/cookie.util.js";
import customResponse from "../../utils/custom.response.util.js";

// ----------------
// ---- public ----
// ----------------
/**
 * 로그인 컨트롤러 처리
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function driverLogin(req, res, next) {
  try {
    const body = req.body; // 파라미터 획득

    // 로그인 서비스 호출
    const { accessToken, refreshToken, driver } = await driverAuthService.driverLogin(body);

    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);
  
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, {accessToken, driver}));
  } catch(error) {
    next(error);
  }
}

/**
 * 토큰 재발급 컨트롤러 처리
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function driverReissue(req, res, next) {
  try {
    const token = cookieUtil.getCookieRefreshToken(req);

    // 토큰 존재 여부 확인
    if(!token) {
      throw customError('리프래시 토큰 없음', REISSUE_ERROR);
    }

    // 토큰 재발급 처리
    const { accessToken, refreshToken, driver } = await driverAuthService.driverReissue(token);

    // 쿠키에 리프래시 토큰 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, { accessToken, driver }))
  } catch(error) {
    next(error);
  }
}

// --------------
// export
// --------------
export default {
  driverLogin,
  driverReissue,
};