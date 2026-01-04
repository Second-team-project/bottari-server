/**
 * @file app/repositories/review.repository.js
 * @description REview Repository
 * 251226 v1.0.0 N init
 */

import db from '../models/index.js';
const { Review, Booker } = db;

/**
 * 후기 목록 불러오기
 * @param {*} t 
 * @param {*} {limit, offset}
 * @returns 
 */
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

/**
 * 후기 작성하기
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function create(t = null, { userId, reservId, title, content, img }) {
  return await Review.create(
    {
      userId: userId,
      reservId: reservId,
      title: title,
      content: content,
      img: img,
    },
    {
      transaction: t
    }
  )
}

/**
 * 후기 id 로 데이터 조회
 * @param {*} t 
 * @param {*} id 
 * @returns 
 */
async function findByPk(t = null, id) {
  return await Review.findByPk(
    id,
    {
      transaction: t
    }
  )
}

/**
 * 후기 삭제하기
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function destroy(t, { id, userId }) {
  return await Review.destroy(
    {
      where: {
        id: id,
        userId: userId,
      },
      transaction: t
    }
  )
};


export default {
  pagination,
  create,
  destroy,
  findByPk,
}