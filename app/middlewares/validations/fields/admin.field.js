/**
 * @file app/middlewares/validations/fields/admin.field.js
 * @description 관리자 정보 유효성 검사 필드
 * 251217 v1.0.0 김민현 init
 */
import { body } from "express-validator";

// 아이디 필드
const accountId = body('account_id')
  .trim()
  .notEmpty()
  .withMessage('아이디는 필수입니다.')
  .bail()
  .isLength({ min: 8, max: 20 })
  .withMessage('아이디는 최소 8자리 이상이어야 합니다.')
  
// 비밀번호 필드
const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/)
  .withMessage('아이디 또는 비밀번호가 일치하지 않습니다.')

export default {
  accountId,
  password,
}