/**
 * @file app/middlewares/validations/fields/review.field.js
 * @description 검색어 유효성 검사 필드
 * 251231 v1.0.0 N init
 */

import { body, param, query } from "express-validator";

// ===== 조회용

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
  .withMessage('조회 id는 필수입니다')
  .isNumeric()
  .withMessage('조회 id는 숫자만 허용합니다.')
  .toInt()
;

// ===== 작성용

const title = body('title')
  .trim()
  .notEmpty()
  .withMessage('제목은 필수입니다')
  .bail()
  .isString()
  .isLength({ min: 2, max: 100 })
  .withMessage('제목은 2~100자 이내여야 합니다')
;

const content = body('content')
  .trim()
  .notEmpty()
  .withMessage('내용은 필수입니다')
  .bail()
  .isString()
  .isLength({ min: 2, max: 2000 })
  .withMessage('내용은 2~2000자 이내여야 합니다')
;

export default {
  page,
  id,
  // 작성용
  title,
  content,
}