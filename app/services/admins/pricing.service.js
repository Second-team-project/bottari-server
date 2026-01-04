/**
 * @file app/sevices/pricing.service.js
 * @description 요금 Service
 * 251224 N init
 */

import additionalPricingRepository from '../../repositories/additionalPricing.repository.js';
import pricingRepository from '../../repositories/pricing.repository.js';

/**
 * 기본 요금 가져오기
 * @returns 기본 요금 배열
 */
async function index() {
  const pricingData = await pricingRepository.findAll(null);

  return pricingData;
}

/**
 * 추가 요금 가져오기
 * @returns 추가 요금 배열
 */
async function indexAdditional() {
  const pricingData = await additionalPricingRepository.findAll(null);

  return pricingData;
}

export default {
  index,
  indexAdditional,
}