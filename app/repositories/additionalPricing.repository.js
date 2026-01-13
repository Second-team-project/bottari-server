/**
 * @file app/repositories/additionalPricing.repository.js
 * @description additional Pricing Repository
 * 260106 v1.0.0 N init
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

/**
 * 요금 생성 하기
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function create(t = null, { serviceType, minValue, maxValue, rate }) {
  return await AdditionalPricing.create(
    { 
      serviceType, 
      minValue, 
      maxValue, 
      rate,
    },
    {
      transaction: t
    }
  )
}

/**
 * 요금 수정하기
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function update(t = null, { id, serviceType, minValue, maxValue, rate }) {
  return await AdditionalPricing.update(
    {
      serviceType, 
      minValue, 
      maxValue, 
      rate,
    },{
      where: {
        id: id,
      },
      transaction: t
    },
  )
}

/**
 * 요금 삭제하기
 * @param {*} t 
 * @param {*} id 
 * @returns 
 */
async function destroy(t = null, id) {
  return await AdditionalPricing.destroy(
    {
      where: {
        id: id
      },
      transaction: t
    }
  )
}

export default {
  findAll,
  create,
  update,
  destroy,
}