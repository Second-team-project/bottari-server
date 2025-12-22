/**
 * @flie app/middlewares/validations/fields/driver.field.js
 * @description 기사 정보 유효성 검사 필드
 * 251222 v1.0.0 김위민 init
 */

import { body } from "express-validator";

export const id = body('id')
  .trim()
  .notEmpty()
  .withMessage('아이디를 입력해주세요.')
  .bail()
  .isLength({ min: 4, max: 20 })
  .withMessage('아이디 또는 비밀번호가 올바르지 않습니다.')
;

export const password = body('password')
  .notEmpty()
  .withMessage('비밀번호를 입력해주세요.')
  .bail()
  .isLength({ min: 8 })
  .withMessage('아이디 또는 비밀번호가 올바르지 않습니다.')
;