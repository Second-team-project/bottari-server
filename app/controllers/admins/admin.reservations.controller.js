/**
 * @file app/controllers/reservations.controller.js
 * @description 관리자 예약 관리 관련 컨트롤러
 * 251224 v1.0.0 김민현 init
 */
import { SUCCESS } from '../../../configs/responseCode.config.js';
import adminReservationsService from '../../services/admins/admin.reservations.service.js';
import customResponse from '../../utils/custom.response.util.js';

/**
 * 예약 관리 목록 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function index(req, res, next) {
  try {
    const page = req.query?.page ? parseInt(req.query?.page) : 1; // 쿼리든 세그먼트는 기본적으로 문자열로 옴.

    const { count, rows } = await adminReservationsService.pagination(page);

    const responseData = {
      page: page,
      limit: 6,
      count: count,
      posts: rows,
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
    const { userId, price, notes, items, serviceType, bookerInfo } = req.body;

    const data = {
      userId,
      price,
      notes, // 요청사항
      items, // 짐 정보
      serviceType, // 예약 종류 : 보관 | 배송
      bookerInfo,
    };

    const result = await adminReservationsService.create(data);

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
    const data = {
      adminId: req.admin.id,
    };

    await adminReservationsService.destroy(data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS));
  } catch(error) {
    return next(error);
  }
}

export default {
  index,
  show,
  store,
  destroy,
}