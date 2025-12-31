/**
 * @file app/middlewares/validations/fields/booker.field.js
 * @description 예약자 정보 유효성 검사 필드
 * 251220 v1.0.0 N init
*/

import { body } from "express-validator";

// =======================
// ||     USER PAGE     ||
// ===== 예약 작성용
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

// ------------------------------------------
// 예약 관리용
// ------------------------------------------
// userId가 없을 때만 필수 체크 (if 조건 사용)
const bookerName = body('bookerInfo.userName')
  .if(body('userId').not().exists({ checkNull: true })) // userId가 없거나 null이면 검사
  .trim()
  .notEmpty()
  .withMessage('비회원 예약 시 예약자 이름은 필수입니다.')
;

const bookerEmail = body('bookerInfo.email')
  .if(body('userId').not().exists({ checkNull: true }))
  .trim()
  .notEmpty()
  .withMessage('이메일은 필수입니다.')
  .bail()
  .isEmail()
  .withMessage('이메일 형식이 올바르지 않습니다.')
;

const bookerPhone = body('bookerInfo.phone')
  .if(body('userId').not().exists({ checkNull: true }))
  .trim()
  .notEmpty()
  .withMessage('연락처는 필수입니다.')
;

export default {
  phone,
  email,
  password,
  passwordChk,
  userName,
  // 조회
  lookupPassword,
  // 예약 관리
  bookerName,
  bookerEmail,
  bookerPhone,
};
