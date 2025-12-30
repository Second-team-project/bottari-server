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
async function pagination(page) {
  const limit = 20;
  const offset = limit * (page - 1);
  
  return await FAQRepository.pagination(null, { limit, offset });
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
 * 공지사항 게시글 수정
 * @param {object} params
 * @param {number} params.adminId
 * @param {number} params.FAQId
 * @param {string} params.title
 * @param {string} params.content
 * @param {string|null} params.image
 */
async function update({ adminId, FAQId, title, content, image }) {
  return await db.sequelize.transaction(async t => {
    const faq = await FAQRepository.findByPk(t, FAQId);

    if (!faq) {
      throw customError('존재하지 않는 글입니다.', NOT_FOUND_ERROR);
    }
    
    if(faq.adminId !== adminId) {
      throw customError('작성자 불일치', UNMATCHING_USER_ERROR);
    }

    // 수정할 데이터 준비
    const updateData = {
      title,
      content,
    };

    // 이미지가 새로 업로드된 경우에만 데이터에 포함 (업로드 안 하면 기존 이미지 유지)
    if (image) {
      updateData.image = image;
    }

    // 업데이트 실행
    await FAQRepository.update(t, FAQId, updateData);
    
    // 업데이트된 최신 정보 반환
    return await FAQRepository.findByPk(t, FAQId);
  });
}

/**
 * FAQ 삭제
 * @returns {Promise<number>}
 */
async function destroy({ adminId, FAQId }) {
  // 트랜잭션 시작
  return await db.sequelize.transaction(async t => {
    // (작성자 일치 확인용)
    const FAQ = await FAQRepository.findByPk(t, FAQId);

    // 작성자 일치 확인
    if(FAQ.adminId !== adminId) {
      throw customError('작성자 불일치', UNMATCHING_USER_ERROR);
    }
    
    // 글 삭제 <= 부모 테이블이기 때문에 foreignKey가 걸려 있어서 가장 마지막에 삭제해야 함.
    await FAQRepository.destroy(t, FAQId);
  });
  
}

export default {
  pagination,
  show,
  create,
  update,
  destroy,
}