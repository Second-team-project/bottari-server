/**
 * @file app/middlewares/validations/fields/search.field.js
 * @description 검색어 유효성 검사 필드
 * 251220 v1.0.0 N init
 */

import { query } from "express-validator";

const addrKeyword = query('keyword')
  .trim()
  .notEmpty()
  .withMessage('검색하려는 주소를 입력 해주세요')
  .bail()
  .isString()
  .isLength({ min: 2, max: 20 })
  .withMessage('검색어는 2~20자 이내여야 합니다')
;

const page = query('page')
  .optional()
  .trim()
  .isInt({ min: 1, max: 999 })
  .withMessage('페이지 번호는 1~999 이상의 숫자여야 합니다')
  .bail()
  .toInt()
;

export default {
  addrKeyword,
  page,
}