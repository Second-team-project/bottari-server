/**
 * @file app/services/chat.service.js
 * @description chat service
 * 260110 v1.0.0 N init
 */

import { NOT_FOUND_ERROR } from "../../configs/responseCode.config.js";
import USER_TYPE from "../../configs/user.type.enum.js";
import customError from "../errors/custom.error.js";
import db from "../models/index.js";
import jwtUtil from "../utils/jwt/jwt.util.js";

import chatMessageRepository from "../repositories/chatMessage.repository.js";
import chatRoomRepository from "../repositories/chatRoom.repository.js";
import reserveService from "./user/reserve.service.js";

/**
 * 채팅방 전체 조회
 * @param {*} param0 
 * @returns 
 */
async function index() {
  return await chatRoomRepository.findAll();
}

/**
 * 채팅방 찾기&생성
 * @param {*} param0 
 * @returns 
 */
async function store({ id, type, bookerId }) {
  return await db.sequelize.transaction(async t => {
    let room = null
    if (type === 'MEMBER') {
      // 회원: user_id로 채팅방 찾기/생성
        room = await chatRoomRepository.findByUserId(t, id);
      if (!room) {
        room = await chatRoomRepository.create(t, { userId: id });
      }
      return room;

    } else if (bookerId) {
      // 비회원: booker_id로 채팅방 찾기/생성
        room = await chatRoomRepository.findByBookerId(t, bookerId);
      if (!room) {
        room = await chatRoomRepository.create(t, { bookerId });
      }
      return room;
    }
  })
}

/**
 * 메세지 조회
 * @param {*} param0 
 * @returns 
 */
async function indexMessage({ roomId }) {
  // 채팅방 존재 확인
  const room = await chatRoomRepository.findRoomById(null, roomId);
  if (!room) {
    throw customError('채팅방을 찾을 수 없습니다.', NOT_FOUND_ERROR);
  }

  // 메시지 목록 조회
  return await chatMessageRepository.findMessagesByRoomId(null, roomId);
}

/**
 * 채팅방 차단하기
 * @param {*} param0 
 * @returns 
 */
async function update({ id, isBlocked }) {
  return await db.sequelize.transaction(async t => {
    // 방 존재 확인
    const room = await chatRoomRepository.findRoomById(t, id);
    if (!room) {
      throw customError('채팅방을 찾을 수 없습니다.', NOT_FOUND_ERROR);
    }

    // 채팅방 수정
    const result = await chatRoomRepository.update(t, { id, isBlocked });
    return result;
  })
}

/**
 * 비회원 채팅 인증 (예약코드 + 비밀번호)
 * @param {{ code: string, password: string }} data
 * @returns {{ accessToken, reservationInfo }}
 */
async function guestAuth({ code, password }) {
  // 1. 비회원 인증 (공통 함수 사용)
  const { reservation, booker } = await reserveService.verifyGuest({ code, password });

  // 2. 액세스 토큰 발급 (리프레시 토큰 없음)
  const accessToken = jwtUtil.generateAccessToken({
    id: booker.id,
    type: USER_TYPE.GUEST
  });

  // 3. 예약 정보 반환 (첫 메시지용)
  return {
    accessToken,
    booker: {
      id: booker.id,
      userName: booker.userName,
      email: booker.email,
    },
    reservation: {
      id: reservation.id,
      code: reservation.code,
      state: reservation.state,
      price: reservation.price,
    }
  };
}

export default {
  index,
  store,
  indexMessage,
  update,
  guestAuth,
}