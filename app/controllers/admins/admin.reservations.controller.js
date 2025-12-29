/**
 * @file app/controllers/reservations.controller.js
 * @description 관리자 예약 관리 관련 컨트롤러
 * 251224 v1.0.0 김민현 init
 */
import { SUCCESS } from '../../../configs/responseCode.config.js';
import adminReservationsService from '../../services/admins/admin.reservations.service.js';
import customResponse from '../../utils/custom.response.util.js';

/**
 * 예약 관리 목록 조회(검색 및 필터 적용)
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function index(req, res, next) {
  try {
    const { 
      page, 
      searchType, // 검색 기준 (code, userName)
      keyword,    // 검색어
      state,      // 예약 상태
      startDate,  // 시작일
      endDate     // 종료일
    } = req.query;

    const params = {
      page: page ? parseInt(page) : 1,
      searchType,
      keyword,
      state,
      startDate,
      endDate
    };

    const { count, rows } = await adminReservationsService.pagination(params);

    const responseData = {
      page: page,
      limit: 20,
      count: count,
      reservations: rows,
    }
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, responseData));
  } catch(error) {
    return next(error);
  }
}

/**
 * 예약 목록 상세 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await adminReservationsService.show(req.params.id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 예약 등록
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function store(req, res, next) {
  try {
    const { userId, price, notes, items, type, bookerInfo } = req.body;

    const data = {
      userId,
      price,
      notes, // 요청사항
      items, // 짐 정보
      type, // 예약 종류 : 보관 | 배송
      bookerInfo,
    };

    const result = await adminReservationsService.create(data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 예약 수정
 * 
 */
async function update(req, res, next) {
  try {
    const { id } = req.params;

    // 수정 가능 필드
    const { 
      state,        // 예약 상태
      price,        // 가격
      notes,        // 관리자 메모
      items,        // 짐 목록
      bookerInfo,   // 비회원 정보
      type,  // 예약 종류
    } = req.body;

    const data = {
      state,
      price,
      notes,
      items,
      bookerInfo,
      type,
    };

    const result = await adminReservationsService.update(id, data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}


/**
 * 예약 삭제
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function destroy(req, res, next) {
  try {
    const { id } = req.params;

    await adminReservationsService.destroy(id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS));
  } catch(error) {
    return next(error);
  }
}

export default {
  index,
  show,
  store,
  update,
  destroy,
}