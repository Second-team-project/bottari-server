/**
 * @file app/repositories/review.repository.js
 * @description REview Repository
 * 251226 v1.0.0 N init
 */

import db from '../models/index.js';
const { Review } = db;

async function pagination(t = null, { limit, offset }) {
  return await Review.findAndCountAll(
    {
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'DESC'],
        ['id', 'ASC'],
      ],
      limit: limit,
      offset: offset,
      transaction: t,
    },
  );
};

/**
 * reviewId로 테이블 찾기
 * @returns 
 */
async function findByPk(t = null, id) {
  return await Review.findOne(
    {
      where: {
        id: id
      },
      transaction: t
    }
  )
}

export default {
  pagination,
  findByPk,
}