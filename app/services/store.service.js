/**
 * @file app/sevices/store.service.js
 * @description 보관소 Service
 * 251224 N init
 */

import storeRepository from '../repositories/store.repository.js';

async function show() {
  // 보관소 정보 획득
  const storeData = await storeRepository.findAll();

  return storeData;
}

export default {
  show,
}