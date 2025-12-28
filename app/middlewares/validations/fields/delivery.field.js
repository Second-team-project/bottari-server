/**
 * @file app/middlewares/validations/fields/delivery.field.js
 * @description 배달 정보 유효성 검사 필드
 * 251223 v1.0.0 N init
 */

import { body } from "express-validator";


const startedAt = body('startedAt')
  .trim()
  .notEmpty()
  .withMessage('맡기는 날짜는 필수 항목입니다.')
  .isISO8601() // 날짜 형식(ISO 8601)인지 체크!
  .withMessage('유효하지 않은 날짜 형식입니다.')
  .toDate() // 검증 후 실제 Date 객체로 변환해줌 (선택사항)
  .custom((value, { req }) => {
    if(new Date(value) <= new Date()) {
      throw new Error('픽업 시간은 현재 시간보다 이후여야 합니다.')
    }
    return true
  })
  .withMessage('픽업 시간은 현재 시간보다 이후여야 합니다.')
;

const startedAddr = body('startedAddr')
  .trim()
  .notEmpty()
  .withMessage('픽업 주소는 필수 항목입니다.')
  .bail()
  .isString()
  .withMessage('픽업 주소는 문자열이어야 합니다.')
;

const endedAddr = body('endedAddr')
  .trim()
  .notEmpty()
  .withMessage('픽업 주소는 필수 항목입니다.')
  .bail()
  .isString()
  .withMessage('픽업 주소는 문자열이어야 합니다.')
;



export default {
  startedAt,
  startedAddr,
  endedAddr,
}
