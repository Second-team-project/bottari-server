/**
 * @file app/sevices/pricing.service.js
 * @description 요금 Service
 * 251224 N init
 */

import db from '../models/index.js';

import pricingRepository from '../repositories/pricing.repository.js';


async function show() {
  const pricingData = await pricingRepository.findAll(null);

  return pricingData;

}

export default {
  show,
}