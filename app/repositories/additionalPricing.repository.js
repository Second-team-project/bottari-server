/**
 * @file app/repositories/pricing.repository.js
 * @description Pricing Repository
 * 251224 v1.0.0 N init
 */

import db from '../models/index.js';
const { AdditionalPricing } = db;

/**
 * 기본 요금 전부 가져오기
 */
async function findAll(t = null) {
  return await AdditionalPricing.findAll(
    {
      transaction: t
    },
  );
}

export default {
  findAll,
}