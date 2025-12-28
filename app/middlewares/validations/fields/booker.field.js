/**
 * @file app/middlewares/validations/fields/booker.field.js
 * @description 예약자 정보 유효성 검사 필드
 * 251220 v1.0.0 N init
*/

import { body } from "express-validator";

// ===== 객체 export =====

const phone = body('phone')
  .optional({ nullable: true, checkFalsy: true })  // null & '' 통과
  .trim()
  .isInt()
  .withMessage('연락처는 숫자여야 합니다.')
  .customSanitizer(value => value === '' ? null : value)  // '' -> null 용
;

  const email = body('email')
  .trim()
  .notEmpty()
  .withMessage('이메일은 필수 항목입니다.')
  .bail()
  .isEmail()
  .withMessage('유효한 이메일을 입력해주세요.')
;

const password = body('password')
  .if((value, { req }) => req.body.userType === 'GUEST' )
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .isLength({ min: 4, max: 20 })
  .withMessage('비밀번호는 4자에서 20자까지 입력 가능합니다.')
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

// 이름
const userName = body('userName')
  .trim()
  .notEmpty()
  .withMessage('예약자 이름은 필수 항목입니다.')
  .bail()
  .isString()
  .isLength({ min: 1, max: 20 })
  .withMessage('이름은 1자에서 20자까지 입력 가능합니다.')
;

// ===== 조회용 =====
  const lookupPassword = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .isLength({ min: 4, max: 20 })
  .withMessage('비밀번호는 4자에서 20자까지 입력 가능합니다.')
;

export default {
  phone,
  email,
  password,
  passwordChk,
  userName,
  // 조회
  lookupPassword,
};
