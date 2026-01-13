/**
 * @file app/middlewares/validations/fields/pricing.field.js
 * @description 요금 관리 유효성 검사 필드
 * 260106 v1.0.0 N init
 */

import { param, body } from "express-validator";

const id = param('id')
  .trim()
  .notEmpty()
  .withMessage('요금 번호는 필수입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

const itemType = body('itemType')
  .trim()
  .notEmpty()
  .withMessage('아이템 타입은 필수입니다.')
  .bail()
  .isIn(['CARRIER', 'BAG', 'BOX', 'GOLF'])
  .withMessage('유효하지 않은 아이템 타입입니다.');

const itemSize = body('itemSize')
  .trim()
  // GOLF 등 사이즈가 없는 경우도 있을 수 있으므로 notEmpty는 제외하거나 상황에 맞게 처리
  // 필요한 경우 .notEmpty().withMessage('아이템 사이즈는 필수입니다.') 추가
;

const itemWeight = body('itemWeight')
  .trim()
  .notEmpty()
  .withMessage('아이템 무게는 필수입니다.');

const serviceType = body('serviceType')
  .trim()
  .notEmpty()
  .withMessage('서비스 타입은 필수입니다.')
  .bail()
  .isIn(['S', 'D'])
  .withMessage('서비스 타입은 S(보관) 또는 D(배송)여야 합니다.');

const basePrice = body('basePrice')
  .trim()
  .notEmpty()
  .withMessage('기본 요금은 필수입니다.')
  .bail()
  .toInt()
  .isInt({ min: 0 })
  .withMessage('요금은 0원 이상이어야 합니다.');

export default {
  id,
  itemType,
  itemSize,
  itemWeight,
  serviceType,
  basePrice,
}
