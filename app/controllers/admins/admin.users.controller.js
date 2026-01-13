/**
 * @file app/controllers/admins/admin.users.controller.js
 * @description 유저 관련 컨트롤러
 * 20260108 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import adminUsersService from "../../services/admins/admin.users.service.js";
import customResponse from "../../utils/custom.response.util.js";
// ===== services

/**
 * 유저 정보 페이지네이션
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function index(req, res, next) {
  try {
    const page = req.query?.page ? parseInt(req.query?.page) : 1;
    const { status, searchType, keyword } = req.query;

    const { count, rows } = await adminUsersService.pagination({ page, status, searchType, keyword });

    const responseData = {
      page: page,
      limit: 20,
      count: count,
      users: rows,
    }

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, responseData))
  } catch (error) {
    return next(error)
  }
}

/**
 * 유저 상세 정보 조회
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function show(req, res, next) {
  try {
    const id = req.params.id;

    const result = await adminUsersService.show({ id });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 유저 수정하기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function update(req, res, next) {
  try {
    const id = req.params.id;
    const { status, adminMemo } = req.body;

    const result = await adminUsersService.update({ id, status, adminMemo });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 유저 삭제하기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function destroy(req, res, next) {
  try {
    const id = req.params.id;

    const result = await adminUsersService.destroy({ id });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  index,
  show,
  update,
  destroy,
}