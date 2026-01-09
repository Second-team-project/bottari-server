/**
 * @file app/controllers/admin.FAQ.controller.js
 * @description FAQ 관련 컨트롤러
 * 251222 v1.0.0 김민현 init
 */
import { SUCCESS } from '../../../configs/responseCode.config.js';
import adminFAQService from '../../services/admins/admin.FAQ.service.js';
import customResponse from '../../utils/custom.response.util.js';

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
    const category = req.query.category

    const { count, rows } = await adminFAQService.pagination({ page, category });

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
    const result = await adminFAQService.show(req.params.id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * FAQ 작성
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function store(req, res, next) {
  try {
    // req.file이 있으면 경로 저장, 없으면 null
    // const imagePath = req.body.image || null;

    const data = {
      adminId: req.user.id, // <= auth middleware에서 세팅한 값
      category: req.body.category,
      title: req.body.title,
      content: req.body.content,
      img: req.file ? `${process.env.APP_URL}${process.env.ACCESS_FILE_FAQ_IMAGE_PATH}/${req.file.filename}` : null,
    };

    const result = await adminFAQService.create(data);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * FAQ 수정
 */
async function update(req, res, next) {
  try {
    // const imagePath = req.body.image || null;

    const data = {
      FAQId: req.params.id, // URL 파라미터의 게시글 ID
      category: req.body.category,
      title: req.body.title,
      content: req.body.content,
      img: req.file ? `${process.env.APP_URL}${process.env.ACCESS_FILE_FAQ_IMAGE_PATH}/${req.file.filename}` : null,
    };

    const result = await adminFAQService.update(data);
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * FAQ 삭제
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function destroy(req, res, next) {
  try {
    await adminFAQService.destroy(req.params.id);

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