/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러
 * 20251217 N init
 */

// config
import PROVIDER from "../middlewares/auth/configs/provider.enum.js";
// service
import authService from "../services/auth.service.js";
// util
import cookieUtil from "../utils/cookie/cookie.util.js";
import socialKakaoUtil from "../utils/social/social.kakao.util.js";

/**
 * 소셜 로그인 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 */
async function social(req, res, next) {
  // client에서 받은 요청을 server에서 kakao로 보냄 → 응답 불필요
  try {
    const provider = req.params.provider.toUpperCase();
    
    let url = '';
    switch(provider) {
      case PROVIDER.KAKAO:
        url = socialKakaoUtil.getAuthrizeURL();
        break;
    }

    return res.redirect(url);
  } catch (error) {
    next(error);
  }
}

/**
 * 소셜 로그인 콜백 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 */
async function socialCallback(req, res, next) {
  try {
    const provider = req.params.provider.toUpperCase();
    let refreshToken = null;
    let code = null;

    switch(provider) {
      case PROVIDER.KAKAO:
        code = req.query?.code;
        refreshToken = await authService.socialKakao(code);
        break;
    }

    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    // 클라이언트 - 카카오 로그인 요청 → 서버에서 카카오로 로그인 요청 → 카카오에서 클라이언트로 응답 :
    // 클라이언트와 백엔드 연결은 이미 끊어짐 → redirect로 react 재구성 필요
    return res.redirect(process.env.SOCIAL_CLIENT_CALLBACK_URL);

  } catch (error) {
    next(error)
  }
}

export default {
  social,
  socialCallback
}