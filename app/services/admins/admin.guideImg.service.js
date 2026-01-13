/**
 * @file app/services/admin/admin.guideImg.service.js
 * @description 가이드이미지 Service
 * 20260107 N init
 */

import db from '../../models/index.js';
import guideImgRepository from '../../repositories/guideImg.repository.js';

/**
 * 이미지 전체 불러오기
 * @returns 
 */
async function index() {
  const result = await guideImgRepository.findAll();

  return result;
}

/**
 * 이미지 추가하기
 * @param {*} param0 
 * @returns 
 */
async function store({ title, type, img, imgEng, active, sortOrder, link }) {
  return await db.sequelize.transaction(async t => {
    // order 최대값
    const maxOrder = await guideImgRepository.max(t, type) || 0;

    const result = await guideImgRepository.create(t, { title, type, img, imgEng, active, sortOrder: sortOrder || (maxOrder + 1), link });
  
    return result;
  })
}

/**
 * 이미지 수정하기
 * @param {*} param0 
 * @returns 
 */
async function update({ id, title, type, img, imgEng, active, sortOrder, link }) {
  return await db.sequelize.transaction(async t => {
    const updateData = {};
    if (title !== undefined) updateData.title = title || null;
    if (type !== undefined) updateData.type = type || null;
    if (img !== undefined) updateData.img = img || null;
    if (imgEng !== undefined) updateData.imgEng = imgEng || null;
    if (active !== undefined) updateData.active = active || null;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder || null;
    if (link !== undefined) updateData.link = link || null;

    const result = await guideImgRepository.update(t, { id, updateData });
  
    return result;
  })
}

/**
 * 이미지 삭제하기
 * @param {*} id 
 * @returns 
 */
async function destroy(id) {
  return await db.sequelize.transaction(async t => {
    const result = await guideImgRepository.destroy(t, id);
  
    return result;
  })
}

export default {
  index,
  store,
  update,
  destroy,
}