/**
 * @flie app/middlewares/validations/fields/driver.field.js
 * @description 기사 정보 유효성 검사 필드
 * 251222 v1.0.0 김위민 init
 */

import { body } from "express-validator";

export const id = body('id')
  .trim()
  .customSanitizer(value => value.toLowerCase())
  .notEmpty()
  .withMessage('아이디를 입력해주세요.')
  .bail()
  .matches(/^[a-z0-9]+$/)
  .withMessage('아이디는 영문과 숫자만 사용할 수 있습니다.')
  .bail()
  .isLength({ min: 4, max: 20 })
  .withMessage('아이디는 최소 4~20글자 입니다.')
;

export const password = body('password')
  .notEmpty()
  .withMessage('비밀번호를 입력해주세요.')
  .bail()
  .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,64}$/)
  .withMessage('비밀번호는 영문과 숫자를 각각 1개 이상 포함해야합니다.')
  .bail()
  .isLength({ min: 8, max: 64 })
  .withMessage('비밀번호는 8~64글자로 입력해주세요.')
;

export const driverName = body('driverName')
  .trim()
  .notEmpty()
  .withMessage('이름은 필수 입력값입니다.')
  .matches(/^[가-힣a-zA-Z\s]+$/)
  .withMessage('이름은 한글과 영어만 입력 가능합니다.')
  .isLength({ min: 2, max: 50 })
  .withMessage('이름은 2자 이상 50자 이하로 입력해주세요.')
;

export const phone = body('phone')
  .trim()
  .notEmpty()
  .withMessage('전화번호는 필수 입력값입니다.')
  .matches(/^01[016789]\d{3,4}\d{4}$/)
  .withMessage('올바른 휴대전화 번호 형식이 아닙니다.')
;

export const carNumber = body('carNumber')
  .trim()
  .notEmpty()
  .withMessage('차량 번호는 필수 입력값입니다.')
  .matches(/^(\d{2,3}[가-힣]\d{4}|[가-힣]\d{2}[가-힣]\d{4})$/)
  .withMessage('올바른 차량 번호 형식이 아닙니다.')
;

export const email = body('email')
  .optional({ checkFalsy: true }) // 비워도 통과
  .trim()
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  .withMessage('올바른 이메일 형식이 아닙니다.')
  .isLength({ max: 50 })
  .withMessage('이메일은 50자 이하이어야 합니다.')
;