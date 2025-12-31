/**
 * @file app/middlewares/validations/fields/review.field.js
 * @description 검색어 유효성 검사 필드
 * 251231 v1.0.0 N init
 */

import { param, query } from "express-validator";

const page = query('page')
  .optional()
  .trim()
  .isInt({ min: 1, max: 999 })
  .withMessage('페이지 번호는 1~999 이상의 숫자여야 합니다')
  .bail()
  .toInt()
;
  
  const id = param('id')
  .trim()
  .notEmpty()
  .withMessage('조회 id는 숫자 필수입니다')
  .isNumeric()
  .withMessage('조회 id는 숫자만 허용합니다.')
  .toInt()
;

export default {
  page,
  id,
}