/**
 * @file app/repositories/guideImg.repository.js
 * @description guideImg Repository
 * 250101 v1.0.0 N init
 */

import db from '../models/index.js';
const { GuideImg } = db;

async function findAllActive(t = null) {
  return await GuideImg.findAll(
    {
      where : {
        active: 'T',
      },
      order: [
        ['createdAt', 'DESC'], // 1순위: 작성일 최신순
        ['updatedAt', 'DESC'], // 2순위: 수정일 최신순
      ],
      transaction: t
    }
  )
};

export default {
  findAllActive,
}