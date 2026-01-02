/**
 * @file app/sevices/review.service.js
 * @description 후기 Service
 * 251231 N init
 */

import reviewRepository from "../../repositories/review.repository.js";

/**
 * 후기 리스트 획득
 * @returns 
 */
async function index(data = {}) {
  const page = parseInt(data.page) || 1;
  const limit = parseInt(data.limit) || 10;

  const offset = (page - 1) * limit;

  const { count, rows } = await reviewRepository.pagination(null, {
    limit,
    offset,
  })

  // const filteredResult = rows.map(item => ({
  //   id: item.id,
  //   userId: item.userId,
  //   reservId: item.reservId,
  //   title: item.title,
  //   img: item.img,
  //   content: item.content,
  //   createdAt: item.createdAt,
  //   updatedAt: item.updatedAt,
  // }));

  return {
    list: rows,
    totalCount: count,
    currentPage: page,
    totalPage: Math.ceil(count / limit),
  };
}

export default {
  index,
}