/**
 * @file app/controllers/admin.emps.controller.js
 * @description 직원 관리 관련 컨트롤러
 * 250101 v1.0.0 김민현 init
 */
import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
import adminEmpsService from "../../services/admins/admin.emps.service.js";

/**
 * 직원 목록 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function index(req, res, next) {
  try {
    const { 
      page,
      adminName,
      accountId,
      email,
      phone,
      code,
    } = req.query;

    const params = {
      page: page ? parseInt(page) : 1,
      adminName,
      accountId,
      email,
      phone,
      code,
    };

    const { count, rows } = await adminEmpsService.pagination(params);

    const responseData = {
      page: params.page,
      limit: 20,
      count: count,
      emps: rows,
    }
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, responseData));
  } catch(error) {
    return next(error);
  }
}

/**
 * 직원 목록 상세 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await adminEmpsService.show(req.params.id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 직원 등록
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function store(req, res, next) {
  try {
    const { 
      adminName,
      email,
      phone,
      accountId,
      passwordHash,
    } = req.body;

    const data = {
      adminName,
      email,
      phone,
      accountId,
      passwordHash,
    };

    const result = await adminEmpsService.create(data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 직원 정보 수정
 */
async function update(req, res, next) {
  try {
    const { id } = req.params;

    // 수정 가능 필드
    const { 
      adminName,
      email,
      phone,
      accountId,
      passwordHash,
    } = req.body;

    const data = {
      adminName,
      email,
      phone,
      accountId,
      passwordHash,
    };

    const result = await adminEmpsService.update(id, data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}


/**
 * 직원 정보 삭제
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function destroy(req, res, next) {
  try {
    const { id } = req.params;

    await adminEmpsService.destroy(id);

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