/**
 * @file app/sevices/admins/admin.store.service.js
 * @description 보관소 Service
 * 251224 N init
 */

import storeRepository from '../../repositories/store.repository.js';

import db from '../../models/index.js';

/**
 * 보관소 정보 모두 가져오기
 * @returns 
 */
async function index() {
  const storeData = await storeRepository.findAll();

  return storeData;
}

/**
 * 보관소 생성
 * @returns 
 */
async function store({ storeName, code, addr, tel }) {
  return await db.sequelize.transaction(async t => {
    const result = await storeRepository.create(t, { storeName, code, addr, tel });
    
    return result;
  })
}

/**
 * 보관소 수정
 * @returns 
 */
async function update({ id, storeName, addr, tel }) {
  return await db.sequelize.transaction(async t => {
    const storeData = await storeRepository.update(t, { id, storeName, addr, tel });
    
    return storeData;
  })
}

/**
 * 보관소 삭제
 * @returns 
 */
async function destroy(id) {
  return await db.sequelize.transaction(async t => {
    const storeData = await storeRepository.destroy(t, id);
    
    return storeData;
  })
}

export default {
  index,
  store,
  update,
  destroy,
}