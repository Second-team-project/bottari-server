/**
 * @file app/middlewares/validations/fields/admin.field.js
 * @description 관리자 정보 유효성 검사 필드
 * 251217 v1.0.0 김민현 init
 */
import { body, param, query } from "express-validator";

// 아이디 필드
const accountId = body('accountId')
  .trim()
  .notEmpty()
  .withMessage('아이디는 필수입니다.')
  .bail()
  .isLength({ min: 4, max: 20 })
  .withMessage('아이디는 최소 4자리 이상이어야 합니다.')
;

// 비밀번호 필드
const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/)
  .withMessage('아이디 또는 비밀번호가 일치하지 않습니다.')
;

// 페이지 필드
const page = query('page')
  .trim()
  .optional()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt()
;

// PK 필드
const paramId = param('id')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt()
;

const adminName = body('adminName')
  .trim()
  .notEmpty()
  .withMessage('이름은 필수 입력값입니다.')
  .matches(/^[가-힣a-zA-Z\s]+$/)
  .withMessage('이름은 한글과 영어만 입력 가능합니다.')
  .isLength({ min: 2, max: 50 })
  .withMessage('이름은 2자 이상 50자 이하로 입력해주세요.')
;

// 이메일 필드
const email = body('email')
  .optional({ checkFalsy: true }) // 비워도 통과
  .trim()
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  .withMessage('올바른 이메일 형식이 아닙니다.')
  .isLength({ max: 50 })
  .withMessage('이메일은 50자 이하이어야 합니다.')
;

// 휴대폰 번호 필드
const phone = body('phone')
  .trim()
  .notEmpty()
  .withMessage('전화번호는 필수 입력값입니다.')
  .matches(/^01[016789]\d{3,4}\d{4}$/)
  .withMessage('올바른 휴대전화 번호 형식이 아닙니다.')
;

// 보관소|본사 코드 필드
const code = body('code')
  .notEmpty()
  .withMessage('보관소 코드는 필수 입력값입니다.')
  .trim()
;

export default {
  accountId,
  password,
  page,
  paramId,
  adminName,
  email,
  phone,
  code,
}