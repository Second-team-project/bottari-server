/**
 * @file app/services/admin.FAQ.service.js
 * @description FAQ service
 * 251222 v1.0.0 김민현 init
 */
import { NOT_FOUND_ERROR, UNMATCHING_USER_ERROR } from "../../../configs/responseCode.config.js";
import customError from "../../errors/custom.error.js";
import db from "../../models/index.js";
import FAQRepository from "../../repositories/FAQ.repository.js";

/**
 * FAQ 페이지네이션
 * @returns {Promise<Array<import("../../models/FAQ.js").FAQ>}
 */
async function pagination({ page, category }) {
  const limit = 20;
  const offset = limit * (page - 1);

  // WHERE 조건 생성
  const where = {};
  if (category && category !== '전체') {
    where.category = category;
  }
  
  return await FAQRepository.pagination(null, { limit, offset, where });
}

/**
 * FAQ 상세
 * @returns {Promise<import("../../models/FAQ.js").FAQ>}
 */
async function show(id) {
  return await FAQRepository.findByPk(null, id);
}

/**
 * FAQ 작성
 * @returns {Promise<import("../../models/FAQ.js").FAQ>}
 */
async function create(data) {
  return await FAQRepository.create(null, data);
}

/**
 * FAQ 수정
 * @param {object} params
 * @param {number} params.adminId
 * @param {number} params.FAQId
 * @param {string} params.title
 * @param {string} params.content
 * @param {string|null} params.image
 */
async function update({ adminId, FAQId, category, title, content, img }) {
  return await db.sequelize.transaction(async t => {
    const faq = await FAQRepository.findByPk(t, FAQId);

    if (!faq) {
      throw customError('존재하지 않는 글입니다.', NOT_FOUND_ERROR);
    }

    // 수정할 데이터 준비
    const updateData = {
      category,
      title,
      content,
    };

    // 이미지가 새로 업로드된 경우에만 데이터에 포함 (업로드 안 하면 기존 이미지 유지)
    if (img) {
      updateData.img = img;
    }

    // 업데이트 실행
    await FAQRepository.update(t, FAQId, updateData);
    
    // 업데이트된 최신 정보 반환
    return await FAQRepository.findByPk(t, FAQId);
  });
}

/**
 * FAQ 삭제
 */
async function destroy(id) {
    return await FAQRepository.destroy(null, id);
}

export default {
  pagination,
  show,
  create,
  update,
  destroy,
}