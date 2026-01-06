/**
 * @file app/middlewares/validations/validators/additionalPricing/admin.additionalPricing.validator.js
 * @description 추가 요금 관리 - 생성, 수정, 삭제 - 유효성 체크
 * 260106 v1.0.0 N init
 */

import additionalPricingField from "../../fields/additionalPricing.field.js"

/**
 * 데이터 생성용 검증
 */
export const storeValidator = [
  additionalPricingField.minValue,
  additionalPricingField.maxValue,
  additionalPricingField.serviceType,
  additionalPricingField.rate
]

/**
 * 데이터 수정용 검증
 */
export const updateValidator = [
  additionalPricingField.id,
  additionalPricingField.minValue,
  additionalPricingField.maxValue,
  additionalPricingField.serviceType,
  additionalPricingField.rate
]

/**
 * 데이터 삭제용 검증
 */
export const destroyValidator = [
  additionalPricingField.id,
]