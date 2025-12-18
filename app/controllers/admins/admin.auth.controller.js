/**
 * @file app/controllers/admin.auth.controller.js
 * @description 관리자 인증 관련 컨트롤러
 * 251217 v1.0.0 김민현 init
 */
import { SUCCESS } from "../../../configs/responseCode.config.js";
import adminAuthService from "../../services/admins/admin.auth.service.js";
import customResponse from "../../utils/custom.response.util.js";

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

    const { accessToken, admin } = await adminAuthService.login(body);

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
    const id = req.admin.id; // <= user = 우리가 만든 authMiddleware에서 생성되는 객체

    // 로그아웃 서비스 호출
    await authService.logout(id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS));
  } catch(error) {
    return next(error);
  }
}

// -------------------------
//          export
// -------------------------
export const adminAuthController = {
  login,
  logout,
}