/**
 * @file app/controllers/user/user.FAQ.controller.js
 * @description FAQ 관련 컨트롤러
 * 260108 v1.0.0 N init
 */

import { SUCCESS } from '../../../configs/responseCode.config.js';
import customResponse from '../../utils/custom.response.util.js';

import faqService from '../../services/user/user.faq.service.js';

/**
 * FAQ 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 * @returns
 */
async function index(req, res, next) {
  try {
    const page = req.query?.page ? parseInt(req.query?.page) : 1; // 쿼리든 세그먼트는 기본적으로 문자열로 옴.

    const { count, rows } = await faqService.pagination(page);

    const responseData = {
      page: page,
      limit: 20,
      count: count,
      faqs: rows,
    }
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, responseData));
  } catch(error) {
    return next(error);
  }
}

/**
 * FAQ 상세 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await faqService.show(req.params.id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

export default {
  index,
  show,
}