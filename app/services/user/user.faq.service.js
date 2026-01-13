/**
 * @file app/services/user.user.faq.service.js
 * @description FAQ service
 * 260108 v1.0.0 N init
 */

import faqRepository from "../../repositories/FAQ.repository.js";

/**
 * FAQ 페이지네이션
 * @returns {Promise<Array<import("../../models/FAQ.js").FAQ>}
 */
async function pagination(page) {
  const limit = 20;
  const offset = limit * (page - 1);
  
  return await faqRepository.pagination(null, { limit, offset });
}

/**
 * FAQ 상세
 * @returns {Promise<import("../../models/FAQ.js").FAQ>}
 */
async function show(id) {
  return await faqRepository.findByPk(null, id);
}

export default {
  pagination,
  show,
}