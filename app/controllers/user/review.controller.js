/**
 * @file app/controllers/user/review.controller.js
 * @description 후기 관련 컨트롤러
 * 20251231 N init
 */

import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";

import reviewService from "../../services/user/review.service.js";

/**
 * 후기 목록 불러오기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function index(req, res, next) {
  try {
    // 1. 클라이언트 데이터 확인
    const { page, limit } = req.query;

    // 2. 서비스 호출
    const result = await reviewService.index({ page, limit });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 후기 작성 가능한 예약 가져오기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function reviewable(req, res, next) {
  try {
    const userId = req.user.id;

    const result = await reviewService.reviewable(userId);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 후기 생성하기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function create(req, res, next) {
  try {
    const userId = req.user.id;
    const data = req.body;
    // {
    //   reservId: 16,
    //   title: '123',
    //   content: '123',
    //   img: 'null',
    // }

    let img = null;
    // img가 있는 경우만 처리
    if(req.file) {
      img = `${process.env.APP_URL}${process.env.ACCESS_FILE_REVIEW_IMAGE_PATH}/${req.file.filename}`;
    }

    const result = await reviewService.create({
      userId: userId,
      reservId: data.reservId,
      title: data.title,
      content: data.content,
      img: img 
    });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 후기 삭제하기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function destroy(req, res, next) {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const result = await reviewService.destroy({ id, userId });

    if (result === 0) {
      throw customError("존재하지 않는 데이터 입니다.", );
    }
    
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
    
  }
}
 
export default {
  index,
  create,
  reviewable,
  destroy,
}