/**
 * @file app/controllers/admins/admin.files.controller.js
 * @description 관리자 파일 업로드 전용 컨트롤러
 * 251230 v1.0.0 김민현 init
 */
import { SUCCESS, BAD_REQUEST_ERROR } from '../../../configs/responseCode.config.js';
import customResponse from '../../utils/custom.response.util.js';
import customError from '../../errors/custom.error.js';

/**
 * 공지사항 이미지 업로드 처리
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function uploadNoticeImage(req, res, next) {
  try {
    // 1. 파일 존재 여부 확인
    if (!req.file) {
      throw customError('이미지 파일이 없습니다.', BAD_REQUEST_ERROR);
    }

    // 2. 반환할 이미지 경로 생성
    const result = {
      path: `${process.env.APP_URL}${process.env.ACCESS_FILE_NOTICE_IMAGE_PATH}/${req.file.filename}`
    };

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

export default {
  uploadNoticeImage,
}