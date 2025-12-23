/**
 * @file app/middlewares/validations/fields/reservation.field.js
 * @description 예약 상태 정보 유효성 검사 필드
 * 251223 v1.0.0 N init
 */

import { body } from "express-validator";
import { SERVICE_TYPE } from "../../../../configs/service.type.enum.js";
import USER_TYPE from "../../../../configs/user.type.enum.js";

const type = body('type')
  .trim()
  .notEmpty()
  .withMessage('서비스 타입은 필수 항목입니다.')
  .bail()
  // 'DELIVERY' or 'STORAGE'
  .isIn(Object.values(SERVICE_TYPE))
  .withMessage('유효하지 않은 서비스 타입입니다.')
;

const userId = body('userId')
  .optional()
  .isInt()
  .withMessage('회원 ID는 숫자여야 합니다')
;

const userType = body('userType')
  .trim()
  .notEmpty()
  .withMessage('유저 타입은 필수 항목입니다.')
  .bail()
  .isIn(Object.values(USER_TYPE))
  .withMessage('유효하지 않은 유저 타입니다.')
;


export default {
  type,
  userId,
  userType,
}