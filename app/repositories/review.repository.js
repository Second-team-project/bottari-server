/**
 * @file app/repositories/review.repository.js
 * @description REview Repository
 * 251226 v1.0.0 N init
 */

import db from '../models/index.js';
const { Review, Booker } = db;

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
      include: [
        {
          model: Booker,
          as: 'reviewBooker',
        }
      ],
      transaction: t,
    },
  );
};




export default {
  pagination,
}