/**
 * @file app/sevices/pricing.service.js
 * @description 요금 Service
 * 251224 N init
 */

import db from '../../models/index.js';

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
 * 요금 생성
 * @param {*} param 
 * @returns 
 */
async function store({ itemType, itemSize, itemWeight, basePrice }) {
  return await db.sequelize.transaction(async t => {
    const result = await pricingRepository.create(t, { itemType, itemSize, itemWeight, basePrice });
  
    return result;
  })
}

/**
 * 요금 수정
 * @param {*} param0 
 * @returns 
 */
async function update({ id, itemType, itemSize, itemWeight, basePrice }) {
  return await db.sequelize.transaction(async t => {
    const result = await pricingRepository.update(t, { id, itemType, itemSize, itemWeight, basePrice });
  
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
    const result = await pricingRepository.destroy(t, id);
  
    return result;
  })
}

export default {
  index,
  store,
  update,
  destroy,
}