/**
 * @file app/repositories/store.repository.js
 * @description Store Repository
 * 251226 v1.0.0 N init
 */

import db from '../models/index.js';
const { Store } = db;

async function findAll(t = null) {
  return await Store.findAll(
    {
      attributes: [
        'id',
        'storeName',
        'code',
        'addr',
        'tel',
      ],
      transaction: t
    }
  )
};

/**
 * storeId로 테이블 찾기
 * @returns 
 */
async function findByPk(t = null, storeId) {
  return await Store.findOne(
    {
      where: {
        id: storeId
      },
      transaction: t
    }
  )
}

export default {
  findAll,
  findByPk,
}