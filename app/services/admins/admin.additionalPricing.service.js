/**
 * @file app/sevices/admins/admin.additionalPricing.service.js
 * @description 추가 요금 Service
 * 260106 N init
 */

import db from '../../models/index.js';

import additionalPricingRepository from '../../repositories/additionalPricing.repository.js';

/**
 * 추가 요금 가져오기
 * @returns 추가 요금 배열
 */
async function index() {
  const pricingData = await additionalPricingRepository.findAll(null);

  return pricingData;
}

/**
 * 추가 요금 생성
 * @param {*} param0 
 * @returns 
 */
async function store({ serviceType, minValue, maxValue, rate }) {
  return await db.sequelize.transaction(async t => {
    const result = await additionalPricingRepository.create(t, { serviceType, minValue, maxValue, rate });
    
    return result;
  })
}

/**
 * 추가 요금 수정
 * @param {*} param0 
 * @returns 
 */
async function update({ id, serviceType, minValue, maxValue, rate }) {
  return await db.sequelize.transaction(async t => {
    const result = await additionalPricingRepository.update(t, { id, serviceType, minValue, maxValue, rate });
  
    return result;
  })
}

/**
 * 요금 삭제
 * @param {*} id 
 * @returns 
 */
async function destroy(id) {
  return await db.sequelize.transaction(async t => {
    const result = await additionalPricingRepository.destroy(t, id);
  
    return result;
  })
}

export default {
  index,
  store,
  update,
  destroy,
}