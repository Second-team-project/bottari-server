/**
 * @file app/sevices/review.service.js
 * @description 후기 Service
 * 251231 N init
 */

import bookerRepository from "../../repositories/booker.repository.js";
import reservationRepository from "../../repositories/reservation.repository.js";
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

  const filteredResult = rows.map(item => ({
    id: item.id,
    reservId: item.reservId,
    title: item.title,
    content: item.content,
    img: item.img,
    createdAt: item.createdAt,

    writer: item.reviewBooker ? {
      userId: item.reviewBooker.userId,
      userName: item.reviewBooker.userName,
      email: item.reviewBooker.email,
    } : null

  }))

  return {
    list: filteredResult,
    totalCount: count,
    currentPage: page,
    totalPage: Math.ceil(count / limit),
  };
}

export default {
  index,
}