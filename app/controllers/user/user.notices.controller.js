/**
 * @file app/controllers/user/user.notices.controller.js
 * @description 공지사항 관련 컨트롤러
 * 260108 v1.0.0 N init
 */

import { SUCCESS } from '../../../configs/responseCode.config.js';
import customResponse from '../../utils/custom.response.util.js';

import noticesService from '../../services/user/user.notices.service.js';

/**
 * 공지사항 게시글 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function index(req, res, next) {
  try {
    const page = req.query?.page ? parseInt(req.query?.page) : 1; // 쿼리든 세그먼트는 기본적으로 문자열로 옴.

    const { count, rows } = await noticesService.pagination(page);

    const responseData = {
      page: page,
      limit: 10,
      count: count,
      notices: rows,
    }
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, responseData));
  } catch(error) {
    return next(error);
  }
}

/**
 * 공지사항 게시글 상세 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await noticesService.show(req.params.id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

export default {
  index,
  show,
}