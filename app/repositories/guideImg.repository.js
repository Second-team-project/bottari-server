/**
 * @file app/repositories/guideImg.repository.js
 * @description guideImg Repository
 * 250101 v1.0.0 N init
 */

import db from '../models/index.js';
const { GuideImg } = db;

/**
 * 활성화 된 이미지만 가져오기
 * @param {*} t 
 * @returns 
 */
async function findAllActive(t = null) {
  return await GuideImg.findAll(
    {
      where : {
        active: 'T',
      },
      order: [
        ['sortOrder', 'ASC'],
        ['createdAt', 'DESC'],
      ],
      transaction: t
    }
  )
};

/**
 * 전체 이미지 가져오기
 * @param {*} t 
 * @returns 
 */
async function findAll(t = null) {
  return await GuideImg.findAll(
    {
      order: [
        ['sortOrder', 'ASC'],
        ['createdAt', 'DESC'],
      ],
      transaction: t
    }
  )
};

/**
 * 이미지 추가하기
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function create(t = null, { title, type, img, imgEng, active, sortOrder, link }) {
  return await GuideImg.create(
    {
      title,
      type,
      img, 
      imgEng, 
      active, 
      sortOrder, 
      link,
    },
    {
      transaction: t
    }
  )
};

/**
 * 이미지 수정하기
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function update(t = null, { id, updateData }) {
  return await GuideImg.update(
    updateData,
    {
      where: {
        id: id,
      },
      transaction: t
    },
  )
};

/**
 * 이미지 삭제 하기
 * @param {*} t 
 * @param {*} id 
 * @returns 
 */
async function destroy(t = null, id) {
  return await GuideImg.destroy(
    {
      where: {
        id: id
      },
      transaction: t
    }
  )
};

async function max(t = null, type) {
  return await GuideImg.max(
    'sortOrder',
    {
      where: {
        type
      },
      transaction: t
    }
  )
};

export default {
  findAllActive,
  findAll,
  create,
  update,
  destroy,
  max,
}