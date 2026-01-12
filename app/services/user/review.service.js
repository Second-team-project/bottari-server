/**
 * @file app/sevices/review.service.js
 * @description 후기 Service
 * 251231 N init
 */

import { FORBIDDEN_ERROR } from '../../../configs/responseCode.config.js';
import customError from '../../errors/custom.error.js';
import db from '../../models/index.js';
import fs from 'fs';
import path from 'path';

// ===== repository
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

    writer: item.reviewUser ? {
      userId: item.userId,
      userName: item.reviewUser.userName,
      email: item.reviewUser.email,
    } : null

  }))

  return {
    list: filteredResult,
    count: count,
    currentPage: page,
    totalPage: Math.ceil(count / limit),
  };
}

/**
 * 후기 작성 가능한 reservId 조회
 * @param {*} userId 
 * @returns 
 */
async function reviewable(userId) {
  const result = await reservationRepository.findReviewableByUserId(null, userId);

  return result;
}

/**
 * 후기 데이터 생성
 * @param {*} param0 
 * @returns 
 */
async function create({ userId, reservId, title, content, img }) {
  return await db.sequelize.transaction(async t => {

    const result = await reviewRepository.create(t, { userId, reservId, title, content, img })
  
    return result;
  })
}

/**
 * 후기 삭제
 * @param {*} param0 
 */
async function destroy({ id, userId }) {
  // 1. DB 삭제 처리를 먼저 진행 (트랜잭션)
  const deletedReview = await db.sequelize.transaction(async t => {
    // 1-1. 데이터 조회 및 권한 체크
    const review = await reviewRepository.findByPk(t, id);
    if (!review || review.userId !== userId) {
      throw customError("삭제 권한이 없습니다.", FORBIDDEN_ERROR);
    }

    // 1-2. 데이터 삭제
    await reviewRepository.destroy(t, { id, userId });
    
    // 삭제 후 파일 정보 활용을 위해 review 객체 반환
    return review;
  });

  // 2. 트랜잭션이 무사히 커밋된 후, 실제 파일 삭제 진행
  if (deletedReview && deletedReview.img) {
    try {
      const filename = deletedReview.img.split('/').pop();
      const filePath = path.join(process.env.FILE_REVIEW_IMAGE_PATH, filename);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      // 파일 삭제 실패는 로그만 남기고 넘깁니다. (이미 DB는 지워졌으므로)
      console.error("실제 파일 삭제 실패 (DB는 삭제됨):", err);
    }
  }

  return true;
}

export default {
  index,
  reviewable,
  create,
  destroy,
}