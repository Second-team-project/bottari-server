/**
 * @file app/middlewares/validations/fields/reservation.field.js
 * @description 예약 상태 정보 유효성 검사 필드
 * 251223 v1.0.0 N init
 */

import { body, param, query } from "express-validator";
import { SERVICE_TYPE } from "../../../../configs/service.type.enum.js";
import USER_TYPE from "../../../../configs/user.type.enum.js";
import { RESERVATION_STATE } from "../../../../configs/reservation.state.enum.js";

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
  .optional({ nullable: true })
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

const price = body('price')
  .trim()
  .notEmpty()
  .withMessage('결제 금액은 필수 항목입니다.')
  .bail()
  .isInt()
  .withMessage('결제 금액은 숫자여야 합니다.')
;

const notes = body('notes')
  .optional({ nullable: true, checkFalsy: true })
  .isString()
  .withMessage('요청사항은 문자열이어야 합니다.')
  .isLength({ max: 200 })
  .withMessage('요청사항은 최대 200자 까지 입력 가능합니다.')
  .trim()
  .customSanitizer(value => value === '' ? null : value)  // '' -> null 용
;

// 조회용

const code = body('code')
  .trim()
  .notEmpty()
  .withMessage('예약 코드는 필수 항목입니다.')
  .bail()
  .matches(/^[DS][MG]\d{6}[2-9A-Z]{5}$/)
  .withMessage('유효하지 않은 예약 코드 형식입니다.')
;

// ===== 예약 관리용
const page = query('page')
.trim()
.optional()
.isNumeric()
.withMessage('숫자만 허용합니다.')
.toInt();

const id = param('id')
.trim()
.notEmpty()
.withMessage('필수 항목입니다.')
.bail()
.isNumeric()
.withMessage('숫자만 허용합니다.')
.toInt();

// ------------------------------------------
// 짐(Items) 관련 필드
// ------------------------------------------
const items = body('items')
  .isArray({ min: 1 })
  .withMessage('짐 정보는 리스트 형태이며, 최소 1개 이상이어야 합니다.')
;

// 짐 내부 객체 검증 (* = 한번에 검사)
const itemType = body('items.*.type')
  .trim()
  .notEmpty()
  .withMessage('짐 종류(type)는 필수입니다.')
;

const itemSize = body('items.*.size')
  .trim()
  .notEmpty()
  .withMessage('짐 크기(size)는 필수입니다.')
;

const itemWeight = body('items.*.weight')
  .optional()
  .isString()
;

const itemCount = body('items.*.count')
  .optional()
  .isInt({ min: 1 })
  .withMessage('수량은 1개 이상이어야 합니다.')
;

// ------------------------------------------
// 수정(Update) 필드 (state)
// ------------------------------------------
const state = body('state')
  .optional()
  .trim()
  .isIn(Object.values(RESERVATION_STATE)) 
  .withMessage('유효하지 않은 예약 상태입니다.')
;


export default {
  type,
  userId,
  userType,
  price,
  notes,
  // 조회용
  code,
  // 예약 관리용
  id,
  page,
  items,
  itemType,
  itemSize,
  itemWeight,
  itemCount,
  state,
}