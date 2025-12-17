/**
 * @file app/middlewares/validations/fields/admin.field.js
 * @description 관리자 정보 유효성 검사 필드
 * 251217 v1.0.0 김민현 init
 */

// 아이디 필드
export const accountId = body('account_id')
  .trim()
  .notEmpty()
  .withMessage('아이디는 필수입니다.')
  .bail()
  
// 비밀번호 필드
export const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/)