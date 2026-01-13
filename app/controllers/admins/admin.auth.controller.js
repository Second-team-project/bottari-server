/**
 * @file app/controllers/admin.auth.controller.js
 * @description 관리자 인증 관련 컨트롤러
 * 251217 v1.0.0 김민현 init
 */
import { SUCCESS } from "../../../configs/responseCode.config.js";
import adminAuthService from "../../services/admins/admin.auth.service.js";
import customResponse from "../../utils/custom.response.util.js";
import cookieUtil from "../../utils/cookie/cookie.util.js";
import customError from "../../errors/custom.error.js";

/**
 * 로그인 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function login(req, res, next) {
  try {
    const body = req.body;

    // 로그인 서비스 호출
    const { accessToken, refreshToken, admin } = await adminAuthService.login(body);

    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, { accessToken, admin }));
  } catch(error) {
    next(error);
  }
}

/**
 * 로그아웃 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function logout(req, res, next) {
  try {
    const id = req.user?.id; // <= user = 우리가 만든 authMiddleware에서 생성되는 객체

    // 로그아웃 서비스 호출
    await adminAuthService.logout(id);

    // Cookie에 refreshToken 만료 처리
    cookieUtil.clearCookieRefreshToken(res);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS));
  } catch(error) {
    return next(error);
  }
}

/**
 * 토큰 재발급 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function reissue(req, res, next) {
  try {
    const token = cookieUtil.getCookieRefreshToken(req);

    // 토큰 존재 여부 확인
    if(!token) {
      throw customError('리프래쉬 토큰 없음', REISSUE_ERROR);
    }

    // 토큰 재발급 처리 <= 서비스에서 처리
    const { accessToken, refreshToken, admin } = await adminAuthService.reissue(token);

    // 쿠키에 리프래쉬 토큰 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, { accessToken, admin }));
  } catch(error) {
    next(error);
  }
}

// -------------------------
//          export
// -------------------------
export const adminAuthController = {
  login,
  logout,
  reissue,
}