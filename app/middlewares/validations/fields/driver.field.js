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