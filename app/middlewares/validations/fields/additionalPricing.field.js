/**
 * @file app/middlewares/validations/fields/additionalPricing.field.js
 * @description 추가 요금 관리 유효성 검사 필드
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

const minValue = body('minValue')
  .trim()
  .notEmpty()
  .withMessage('최소 값은 필수입니다.')
  .bail()
  .toInt()
  .isInt({ min: 0 })
  .withMessage('최소 값은 0 이상의 숫자여야 합니다.');

const maxValue = body('maxValue')
  .trim()
  .notEmpty()
  .withMessage('최대 값은 필수입니다.')
  .bail()
  .toInt()
  .isInt({ min: 0 })
  .withMessage('최대 값은 0 이상의 숫자여야 합니다.')
  .custom((value, { req }) => {
    // req.body.minValue가 유효한 숫자인 경우에만 비교 진행
    const min = parseInt(req.body.minValue);
    if (!isNaN(min) && value <= min) {
      throw new Error('최대 값은 최소 값보다 커야 합니다.');
    }
    return true;
  });

const serviceType = body('serviceType')
  .trim()
  .notEmpty()
  .withMessage('서비스 타입은 필수입니다.')
  .bail()
  .isIn(['S', 'D'])
  .withMessage('서비스 타입은 S(보관) 또는 D(배송)여야 합니다.');

const rate = body('rate')
  .trim()
  .notEmpty()
  .withMessage('추가 금액 비율은 필수입니다.')
  .bail()
  .toInt()
  .isInt({ min: 0 })
  .withMessage('추가 금액 비율은 0 이상의 숫자여야 합니다.');

export default {
  id,
  minValue,
  maxValue,
  serviceType,
  rate,
}