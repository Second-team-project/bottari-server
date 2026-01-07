/**
 * @file app/middlewares/validations/fields/store.field.js
 * @description 보관소 유효성 검사 필드
 * 260107 v1.0.0 N init
 */

import { body, param } from "express-validator";

const id = param('id')
  .trim()
  .notEmpty()
  .withMessage('보관소 번호는 필수입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();
;

const code = body('code')
  .trim()
  .notEmpty()
  .withMessage('보관소 코드는 필수입니다.')
  .isLength({ max: 10 })
  .withMessage('보관소 코드는 10자 이내여야 합니다.')
  .isString()
;

const storeName = body('storeName')
  .trim()
  .notEmpty()
  .withMessage('보관소 이름은 필수입니다.')
  .isLength({ max: 20 })
  .withMessage('보관소 이름은 20자 이내여야 합니다.')
  .isString()
;

const addr = body('addr')
  .trim()
  .notEmpty()
  .withMessage('보관소 주소는 필수입니다.')
  .isLength({ max: 255 })
  .withMessage('주소는 255자 이내여야 합니다.')
  .isString()
;
  
  const tel = body('tel')
  .trim()
  .notEmpty()
  .withMessage('보관소 연락처는 필수입니다.')
  .isLength({ max: 25 })
  .withMessage('연락처는 25자 이내여야 합니다.')
  .isString()
;

export default {
  id,
  code,
  storeName,
  addr,
  tel,
}