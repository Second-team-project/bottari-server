/**
 * @file app/services/admin.FAQ.service.js
 * @description FAQ service
 * 251222 v1.0.0 김민현 init
 */
import { UNMATCHING_USER_ERROR } from "../../../configs/responseCode.config.js";
import customError from "../../errors/custom.error.js";
import db from "../../models/index.js";
import FAQRepository from "../../repositories/FAQ.repository.js";

/**
 * FAQ 페이지네이션
 * @returns {Promise<Array<import("../../models/FAQ.js").FAQ>}
 */
async function pagination(page) {
  const limit = 6;
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
  destroy,
}