/**
 * @file app/sevices/pricing.service.js
 * @description 요금 Service
 * 251224 N init
 */

import db from '../models/index.js';

import pricingRepository from '../repositories/pricing.repository.js';


async function show() {
  // 트랜잭션 처리
  return await db.sequelize.transaction(async t => {

    // 요금 정보 획득
    const pricingData = await pricingRepository.findAll(t);

    return pricingData;
  })
}

export default {
  show,
}