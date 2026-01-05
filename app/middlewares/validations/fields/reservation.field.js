/**
 * @file app/middlewares/validations/fields/reservation.field.js
 * @description 예약 상태 정보 유효성 검사 필드
 * 251223 v1.0.0 N init
 */

import { body, param, query } from "express-validator";
import { SERVICE_TYPE } from "../../../../configs/service.type.enum.js";
import USER_TYPE from "../../../../configs/user.type.enum.js";
import { RESERVATION_STATE } from "../../../../configs/reservation.state.enum.js";

// =======================
// ||     USER PAGE     ||
// ===== 예약 작성
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
  .toInt()
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
  .toInt()
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

// ===== 예약 조회 페이지 용

const code = body('code')
  .trim()
  .notEmpty()
  .withMessage('예약 코드는 필수 항목입니다.')
  .bail()
  .matches(/^[DS][MG]\d{6}[2-9A-Z]{5}$/)
  .withMessage('유효하지 않은 예약 코드 형식입니다.')
;

// ===== 취소 관련 용
const cancelCode = param('code')
  .trim()
  .notEmpty()
  .withMessage('예약 코드는 필수입니다.')
  .matches(/^[DS][MG]\d{6}[2-9A-Z]{5}$/)
  .withMessage('유효하지 않은 예약 코드 형식입니다.')
;

const cancelReason = body('reason')
  .trim()
  .notEmpty()
  .withMessage('취소 사유는 필수 항목입니다.')
  .bail()
  .isLength({ min: 4, max: 200 })
  .withMessage('취소 사유는 최소 10자에서 최대 200자까지 입력 가능합니다.')
;

// ===== 리뷰 작성용 (아래 'id'와 같지만 받아오는 이름이 달라서 추가 작성)
const reservId = body('reservId')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();


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
// 수정(Update) 필드 (state)
// ------------------------------------------
const state = body('state')
  .optional()
  .trim()
  .isIn(Object.values(RESERVATION_STATE)) 
  .withMessage('유효하지 않은 예약 상태입니다.')
;

const resId = body('resId')
  .exists()
  .withMessage('예약 ID가 필요합니다.')
  .isInt()
  .withMessage('올바른 예약 ID 형식이 아닙니다.')
;

const currentState = body('currentState')
  .exists()
  .withMessage('현재 상태 값이 필요합니다.')
  .isIn(['PICKING_UP', 'IN_PROGRESS'])
  .withMessage('변경 가능한 상태가 아니거나 완료된 예약 건입니다.')
;

export default {
  // ===== USER PAGE
  // 예약 작성
  type,
  userId,
  userType,
  price,
  notes,
  // 조회용
  code,
  // 취소
  cancelCode,
  cancelReason,
  // 조회 작성용
  reservId,
  
  // ===== 예약 관리용
  id,
  page,
  state,
  resId,
  currentState,
}