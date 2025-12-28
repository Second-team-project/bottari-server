/**
 * @file app/middlewares/validations/fields/storage.field.js
 * @description 보관 정보 유효성 검사 필드
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
;

const endedAt = body('endedAt')
  .trim()
  .notEmpty()
  .withMessage('되찾는 날짜는 필수 항목입니다.')
  .isISO8601() // 날짜 형식(ISO 8601)인지 체크!
  .toDate()
  .custom((value, { req }) => {
    if(new Date(value) <= new Date(req.body.startedAt)) {
      throw new Error('찾는 시간은 맡기는 시간보다 이후여야 합니다.')
    }
    return true
  })
  .withMessage('찾는 시간은 맡기는 시간보다 이후여야 합니다.')

;

const storeId = body('storeId')
  .trim()
  .notEmpty()
  .withMessage('보관소 번호는 필수 정보입니다.')
  .bail()
  .isInt()
  .withMessage('보관소 번호는 숫자여야 합니다.')
;


export default {
  startedAt,
  endedAt,
  storeId,
}