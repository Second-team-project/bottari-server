/**
 * @file app/sevices/user/auth.service.js
 * @description auth Service
 * 251217 N init
 */

import axios from 'axios';
import bcrypt from 'bcrypt';
import db from '../../models/index.js';
// config
import { NOT_REGISTERED_ERROR, REISSUE_ERROR } from '../../../configs/responseCode.config.js';
import PROVIDER from '../../middlewares/auth/configs/provider.enum.js';
import USER_TYPE from '../../../configs/user.type.enum.js';
// repository
import userRepository from "../../repositories/user.repository.js";
// util
import customError from '../../errors/custom.error.js';
import jwtUtil from '../../utils/jwt/jwt.util.js';
import socialKakaoUtil from '../../utils/social/social.kakao.util.js';

// TODO : LOGIN

/**
 * 로그아웃 처리
 * @param {number} id - 유저id
 */
async function logout(id) {
  return await userRepository.logout(null, id);
}

// reissue
/**
 * 토큰 재발급 처리
 * @param {string} token 
 * @returns 
 */
async function reissue(token) {
  // 토큰 검증 및 유저 id 획득
  //     ↱ payload 반환
  const claims = jwtUtil.getClaimsWithVerifyToken(token)
  const userId = claims.sub;

  return await db.sequelize.transaction(async t => {
    // 유저 정보 획득
    const user = await userRepository.findByPk(t, userId);

    // 토큰 일치 검증
    if(token !== user.refreshToken) {
      throw customError('리프레시 토큰 불일치', REISSUE_ERROR);
    }

    // JWT 생성 - 액세스 토큰, 리프레시 토큰
    const accessToken = jwtUtil.generateAccessToken({
      id: user.id,
      type: USER_TYPE.MEMBER  // reissue 는 member만 사용
    });
    const refreshToken = jwtUtil.generateRefreshToken(user);

    // 리프레시 토큰 DB 에 저장 - 기존 user 모델에 새로 발급한 리프레시 토큰으로 교체
    user.refreshToken = refreshToken;
    await userRepository.save(t, user);

    return {
      accessToken,
      refreshToken,
      user,
    };
  })
}

/**
 * 소셜 로그인 - 카카오 
 * @param {*} code 
 */
async function socialKakao(code) {
  // 토큰 획득 요청에 필요한 헤더와 바디 생성
  const tokenRequest = socialKakaoUtil.getTokenRequest(code);

  // 1. 토큰 획득 요청
  const resultToken = await axios.post(
    process.env.SOCIAL_KAKAO_API_URL_TOKEN, 
    tokenRequest.searchParams, 
    { headers: tokenRequest.headers }
  )
  const { access_token } = resultToken.data;
  
  // 2. 토큰으로 사용자 정보 획득 (카카오에서 주는)
  const userRequest = socialKakaoUtil.getUserRequest(access_token);
  const resultUser = await axios.post(
    process.env.SOCIAL_KAKAO_API_URL_USER_INFO, 
    userRequest.searchParams.toString(), 
    { headers: userRequest.headers }
  );

  const kakaoId = resultUser.data.id;
  const email = resultUser.data.kakao_account.email;
  // TODO : user profile 받을지 말지
  // const profile = resultUser.data.kakao_account.profile.thumbnail_image_url;
    //   ↳ 카카오 서버로 부터 다운로드 받아서 profile 폴더에 보관해야함
  const nick = resultUser.data.kakao_account.profile.nickname;
  // console.log('사용자 정보:', kakaoId, email, profile, nick)
  
  // 트랜잭션
  const refreshToken = await db.sequelize.transaction(async t => {
    // 3. 사용자 정보로 가입한 회원인지 체크
    let user = await userRepository.findByEmail(t, email);

    if(!user) {
      // 3-1. 미가입 회원 -> 회원가입 처리
      const data = {
        userName: nick,
        email,
        // profile,
        // password: bcrypt.hashSync(crypto.randomUUID(), 10),
        provider: PROVIDER.KAKAO,
      };
      user = await userRepository.create(t, data);

    } else {
      // 3-2. provider 확인하고 카카오 아니면 변경
      if(user.provider !== PROVIDER.KAKAO) {
        user.provider = PROVIDER.KAKAO;
        user.userName = nick;
      }
    }
    
    // 3-3. 우리 리프레시 토큰 생성 (카카오로는 토큰 체크 및 정보 추출 불가)
    const refreshToken = jwtUtil.generateRefreshToken(user);
    
    // 리프레시 토큰 저장 및 리턴
    user.refreshToken = refreshToken;
    await userRepository.save(t, user);

    return refreshToken;
  });

  // 4. 카카오 로그아웃
  try {
    const logoutRequest = socialKakaoUtil.getLogoutRequest(kakaoId, access_token);
    await axios.post(
      process.env.SOCIAL_KAKAO_API_URL_LOGOUT,
      logoutRequest.searchParams,
      { headers: logoutRequest.headers }
    )
    
  } catch (error) {
    console.warn('카카오 로그아웃 실패:', error.message);
  }

  // 5. 최종적으로 우리 리프레시 토큰 반환
  return refreshToken;
}

export default {
  // login,
  logout,
  reissue,
  socialKakao,
}