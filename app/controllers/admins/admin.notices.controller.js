/**
 * @file app/controllers/admin.notices.controller.js
 * @description 공지사항 관련 컨트롤러
 * 251222 v1.0.0 김민현 init
 */
import { SUCCESS } from '../../../configs/responseCode.config.js';
import adminNoticesService from '../../services/admins/admin.notices.service.js';
import customResponse from '../../utils/custom.response.util.js';

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

    const { count, rows } = await adminNoticesService.pagination(page);

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
 * 공지사항 게시글 상세 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await adminNoticesService.show(req.params.id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 공지사항 게시글 작성
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function store(req, res, next) {
  try {
    const data = {
      adminId: req.admin.id, // <= auth middleware에서 세팅한 값
      content: req.body.content,
      image: req.body.image,
    };

    const result = await adminNoticesService.create(data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 공지사항 게시글 삭제
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function destroy(req, res, next) {
  try {
    const data = {
      adminId: req.admin.id, // <= auth middleware에서 세팅한 값
      noticeId: req.params.id
    };

    await adminNoticesService.destroy(data);

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