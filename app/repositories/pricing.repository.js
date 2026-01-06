/**
 * @file app/repositories/pricing.repository.js
 * @description Pricing Repository
 * 251224 v1.0.0 N init
 */

import db from '../models/index.js';
const { Pricing } = db;

/**
 * 기본 요금 전부 가져오기
 */
async function findAll(t = null) {
  return await Pricing.findAll(
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
async function create(t = null, { itemType, itemSize, itemWeight, basePrice }) {
  return await Pricing.create(
    { 
      itemType, 
      itemSize, 
      itemWeight, 
      basePrice
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
async function update(t = null, { id, itemType, itemSize, itemWeight, basePrice }) {
  return await Pricing.update(
    {
      itemType, 
      itemSize, 
      itemWeight, 
      basePrice,
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
  return await Pricing.destroy(
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