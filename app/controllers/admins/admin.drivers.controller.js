/**
 * @file app/controllers/admin.drivers.controller.js
 * @description 기사 관리 관련 컨트롤러
 * 251231 v1.0.0 김민현 init
 */
import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
import adminDriversService from "../../services/admins/admin.drivers.service.js";

/**
 * 기사 목록 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function index(req, res, next) {
  try {
    const { 
      page,
      driverName,
      accountId,
      email,
      phone,
      notes,
      carNumber,
      attendanceState
    } = req.query;

    const params = {
      page: page ? parseInt(page) : 1,
      driverName,
      accountId,
      email,
      phone,
      notes,
      carNumber,
      attendanceState
    };

    const { count, rows } = await adminDriversService.pagination(params);

    const responseData = {
      page: params.page,
      limit: 20,
      count: count,
      drivers: rows,
    }
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, responseData));
  } catch(error) {
    return next(error);
  }
}

/**
 * 기사 목록 상세 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await adminDriversService.show(req.params.id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 기사 등록
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function store(req, res, next) {
  try {
    const { 
      driverName,
      email,
      phone,
      accountId,
      password,
      carNumber,
      notes
    } = req.body;

    const data = {
      driverName,
      email,
      phone,
      accountId,
      password,
      carNumber,
      notes
    };

    const result = await adminDriversService.create(data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 기사 정보 수정
 */
async function update(req, res, next) {
  try {
    const { id } = req.params;

    // 수정 가능 필드
    const { 
      driverName,
      email,
      phone,
      password,
      carNumber,
      notes
    } = req.body;

    const data = {
      driverName,
      email,
      phone,
      password,
      carNumber,
      notes
    };

    const result = await adminDriversService.update(id, data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}


/**
 * 기사 정보 삭제
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function destroy(req, res, next) {
  try {
    const { id } = req.params;

    await adminDriversService.destroy(id);

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