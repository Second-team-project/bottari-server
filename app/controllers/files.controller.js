/**
 * @file app/controllers/files.controller.js
 * @description 파일 업로드 관련 컨트롤러
 * 260110 v1.0.0 N init
 */

import { BAD_FILE_ERROR, SUCCESS } from "../../configs/responseCode.config.js";
import customResponse from "../utils/custom.response.util.js";

import customError from "../errors/custom.error.js";

/**
 * 채팅에 전송할 이미지 저장 및 경로 반환
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function chatImg(req, res, next) {
  try {
    if(!req.file) {
      throw customError('파일 없음: ', BAD_FILE_ERROR)
    }
    const img = `${process.env.APP_URL}${process.env.ACCESS_FILE_CHAT_IMAGE_PATH}/${req?.file.filename}`;
    console.log('controller-file: ', img)

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, img))
  } catch (error) {
    return next(error);
  }
}

export default {
  chatImg,
}