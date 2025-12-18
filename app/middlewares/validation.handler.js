/**
 * @file app/middlewares/validations/validationHandler.js
 * @description 유효성 검사 핸들러
 * 251218 v1.0.0 김민현 init
 */
import { validationResult } from "express-validator";
import { BAD_REQUEST_ERROR } from "../../configs/responseCode.config.js";
import { customResponse } from "../utils/custom.response.util.js";

export default function validationHandler(req, res, next) {
  const errors = validationResult(req);

  // 에러 발생 여부 확인
  if(!errors.isEmpty()) {
    // express validation error 커스텀
    const definedErrors = errors.formatWith(error => `${error.path}: ${error.msg}`);

    // 에러 응답
    return res.status(BAD_REQUEST_ERROR.status).send(customResponse(BAD_REQUEST_ERROR, definedErrors.array()));
  }

  next();
}