/**
 * @file app/middlewares/validations/validators/pricing/admin.pricing.validator.js
 * @description 요금 관리 - 생성, 수정, 삭제 - 유효성 체크
 * 260106 v1.0.0 N init
 */

import pricingField from "../../fields/pricing.field.js";

/**
 * 데이터 생성용 검증
 */
export const storeValidator = [
  pricingField.itemType,
  pricingField.itemSize,
  pricingField.itemWeight,
  pricingField.serviceType,
  pricingField.basePrice
]

/**
 * 데이터 수정용 검증
 */
export const updateValidator = [
  pricingField.id,
  pricingField.itemType,
  pricingField.itemSize,
  pricingField.itemWeight,
  pricingField.serviceType,
  pricingField.basePrice
]

/**
 * 데이터 삭제용 검증
 */
export const destroyValidator = [
  pricingField.id,
]