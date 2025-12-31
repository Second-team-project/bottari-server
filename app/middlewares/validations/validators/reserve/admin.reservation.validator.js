/**
 * @file app/middlewares/validations/validators/reserve/admin.reservations.validator.js
 * @description 예약 관리 유효성 체크
 * 251229 v1.0.0 김민현 init
 */

import { body } from 'express-validator';
import reservationField from '../../fields/reservation.field.js';
import bookerField from '../../fields/booker.field.js';

// 공통 ID 검사기
export const idValidator = [
  reservationField.id
];

// index 검사기
export const indexValidator = [
  reservationField.page
];

// 등록(Store)용 검사기
export const storeValidator = [
  reservationField.price,
  reservationField.type,
  reservationField.notes,
  // 짐 검사
  reservationField.items,
  reservationField.itemType,
  reservationField.itemSize,
  reservationField.itemCount,
  // 비회원 정보 검사 (userId가 없을 때만 작동하도록 field에 설정됨)
  bookerField.bookerName,
  bookerField.bookerEmail,
  bookerField.bookerPhone
];

// 수정(Update)용 검사기
// PATCH이므로 모든 필드를 `.optional()` 처리
export const updateValidator = [
  body('price').optional().isInt({ min: 0 }), // field파일의 price는 필수기 때문에 여기서 새로 정의
  body('notes').optional().isString(),
  reservationField.state, // 이건 field 파일 자체에 optional이 되어 있음
  
  // 짐 정보가 온다면 배열 규칙 체크
  // items 배열 자체가 오는지 안 오는지 검사
  body('items').optional().isArray(),

  reservationField.itemType,
  reservationField.itemSize,
  
  // 비회원 정보가 온다면 체크
  body('bookerInfo.email').optional().isEmail(),
];