/**
 * @file app/repositories/pricing.repository.js
 * @description Pricing Repository
 * 251224 v1.0.0 N init
 */

import db from '../models/index.js';
const { Pricing } = db;

/**
 * 예약 정보 생성
 */
async function findAll(t = null) {
  return await Pricing.findAll(
    {
      attributes:[
        'itemType',
        'itemSize',
        'itemWeight',
        'serviceType',
        'basePrice',
        'minValue',
        'maxValue',
        'addPrice'
      ],
      transaction: t
    },
  );
}

export default {
  findAll,
}