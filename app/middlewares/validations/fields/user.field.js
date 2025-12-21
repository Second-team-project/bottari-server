/**
 * @file app/middlewares/validations/fields/user.field.js
 * @description 유저 정보 유효성 검사 필드
 * 251220 v1.0.0 N init
 */

import { body, param } from "express-validator";

import PROVIDER from "../../auth/configs/provider.enum.js";

// ===== 객체 export =====

const email = body('email')
  .trim()
  .notEmpty()
  .withMessage('이메일은 필수 항목입니다.')
  .bail()
  .isEmail()
  .withMessage('유효한 이메일을 입력해주세요.')
;

const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/)
  .withMessage('영어 대/소문자·숫자·!·@·#·$, 8~20자 입력 가능합니다.')
;

// 비밀번호 체크
const passwordChk = body('passwordChk')
  .trim()
  .custom((val, {req}) => {
    if(val !== req.body.password) {
      return false;
    }
    return true;
  })
  .withMessage('비밀번호가 다릅니다.')
;

// 닉네임
const userName = body('userName')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9가-힣_]{3,20}$/)
  .withMessage('영어대소문자·숫자·한글·_ 3~20자 허용')
;

const provider = param('provider')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .custom(val => {
    return PROVIDER[val.toUpperCase()] ? true : false ;
  })
  .withMessage('허용하지 않는 값입니다.')
;

export default {
  email,
  password,
  passwordChk,
  userName,
  provider,
};