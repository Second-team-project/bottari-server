/**
 * @file app/repositories/store.repository.js
 * @description Store Repository
 * 251226 v1.0.0 N init
 */

import db from '../models/index.js';
const { Store } = db;

/**
 * 보관소 전부 찾기
 * @param {*} t 
 * @returns 
 */
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
async function findByPk(t = null, id) {
  return await Store.findByPk(
    id,
    {
      transaction: t
    }
  )
}

/**
 * 보관소 생성
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function create(t = null, { storeName, code, addr, tel }) {
  return await Store.create(
    { 
      storeName, 
      code, 
      addr, 
      tel 
    },
    {
      transaction: t
    }
  )
} 

/**
 * 보관소 수정
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function update(t = null, { id, storeName, addr, tel }) {
  return await Store.update(
    { 
      storeName, 
      addr, 
      tel 
    },
    {
      where: {
        id: id,
      },
      transaction: t
    }
  )
} 

/**
 * 보관소 삭제
 * @param {*} t 
 * @param {*} id 
 * @returns 
 */
async function destroy(t = null, id) {
  return await Store.destroy(
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
  findByPk,

  create,
  update,
  destroy,
}