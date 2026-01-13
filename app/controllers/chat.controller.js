/**
 * @file app/controllers/chat.controller.js
 * @description 채팅 관련 컨트롤러
 * 260110 v1.0.0 N init
 */

import { SUCCESS, NOT_FOUND_ERROR } from "../../configs/responseCode.config.js";
import customResponse from "../utils/custom.response.util.js";

import chatService from "../services/chat.service.js";

/**
 * 채팅방 목록 조회
 * - 관리자: 전체 채팅방 목록 (유저/비회원 정보 포함)
 * - 유저: 자기 채팅방
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function index(req, res, next) {
  try {
    const { id } = req.user;

    const result = await chatService.index({ id });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

/**
 * 채팅방 생성 (또는 기존 채팅방 반환)
 * - 회원: user_id당 1개
 * - 비회원: booker_id당 1개
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function store(req, res, next) {
  try {
    const { id, type } = req.user;
    const { bookerId } = req.body; // 비회원인 경우

    const result = await chatService.store({ id, type, bookerId })

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

/**
 * 채팅 메시지 목록 조회
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function indexMessage(req, res, next) {
  try {
    const roomId = req.params.id;

    const result = await chatService.indexMessage({ roomId })

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

/**
 * 채팅방 수정
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function update(req, res, next) {
  try {
    const id = req.params.id;
    const { isBlocked } = req.body;

    const result = await chatService.update({ id, isBlocked })

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

/**
 * 비회원 채팅 인증
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function guestAuth(req, res, next) {
  try {
    const { code, password } = req.body;

    const result = await chatService.guestAuth({ code, password });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

export default {
  index,
  store,
  indexMessage,
  update,
  guestAuth,
}
