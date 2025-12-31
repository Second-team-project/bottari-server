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
    // req.file이 있으면 경로 저장, 없으면 null
    const imagePath = req.body.image || null;

    const data = {
      adminId: req.user.id, // <= auth middleware에서 세팅한 값
      title: req.body.title,
      content: req.body.content,
      image: imagePath,
    };

    const result = await adminNoticesService.create(data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 공지사항 게시글 수정
 */
async function update(req, res, next) {    
  try {
    const imagePath = req.body.image || null;

    const data = {
      adminId: req.user.id,
      noticeId: req.params.id, // URL 파라미터의 게시글 ID
      title: req.body.title,
      content: req.body.content,
      image: imagePath, 
    };

    const result = await adminNoticesService.update(data);
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
      adminId: req.user.id, // <= auth middleware에서 세팅한 값
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
  update,
  destroy,
}