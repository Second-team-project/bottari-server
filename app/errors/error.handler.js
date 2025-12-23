/**
 * @file app/errors/errorHandler.js
 * @description 에러 핸들러
 * 251213 v1.0.0 N init
 */

import { BaseError, UniqueConstraintError } from "sequelize";
import { DB_ERROR, SYSTEM_ERROR } from "../../configs/responseCode.config.js";
import customResponse from "../utils/custom.response.util.js";

/**
 * 에러 핸들러.
 * 모든 에러는 `err.codeInfo` 프로퍼티를 포함하고 있을 것.
 * 파라미터로 전달받은 에러 객체에 `codeInfo`가 없을 경우, DB에러 or 시스템에러로 설정.
 * 이때, `codeInfo`는 ("responseCode.config.type.js").ResponseCodeConfig 참조
 * @param {Error} err 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
export default function errorHandler(err, req, res, next) {
  // sequelize 에러 처리
  // 1. DB 에러일 경우
  // 1-1. 유니크 에러일 경우
  if (err instanceof UniqueConstraintError) {
    err.codeInfo = CONFLICT_ERROR;  // "이미 존재하는 데이터입니다" 같은 일반 메시지
  }
  // 1-2. 다른 일반 DB 에러일 경우
  if(err instanceof BaseError) {
    err.codeInfo = DB_ERROR;
  }

  // 2. 예기치 못한 에러일 경우
  if(!err.codeInfo) {
    err.codeInfo =  SYSTEM_ERROR;
  }

  // 3. 시스템 에러 및 DB 에러 일 경우, 로그 출력
  if(err.codeInfo.code === SYSTEM_ERROR.code || err.codeInfo.code === DB_ERROR.code ) {
    // ↱ wiston.logger 에서 임포트 + 로깅할 level + (출력 내용)
    // TODO console -> logger
    console.error(`${err.name}: ${err.message}\n${err.stack}`);
  }

  // 4. 개발 모드일 경우 콘솔로 에러 로그 출력
  if(process.env.APP_MODE === 'dev') {
    console.log(`${err.name}: ${err.message}\n${err.stack}`);
  }

  return res.status(err.codeInfo.status).send(customResponse(err.codeInfo))
}