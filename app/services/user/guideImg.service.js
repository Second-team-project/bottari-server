/**
 * @file app/services/user/guideImg.service.js
 * @description 가이드이미지 Service
 * 250101 N init
 */

import guideImgRepository from '../../repositories/guideImg.repository.js';

async function index() {
  const result = await guideImgRepository.findAllActive();

  return result;
}

export default {
  index,
}