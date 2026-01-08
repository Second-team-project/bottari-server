/**
 * @file app/services/user/user.notices.service.js
 * @description 공지사항 service
 * 260108 v1.0.0 N init
 */
import { NOT_FOUND_ERROR, UNMATCHING_USER_ERROR } from "../../../configs/responseCode.config.js";
import customError from "../../errors/custom.error.js";
import db from "../../models/index.js";
import noticeRepository from "../../repositories/notice.repository.js";

/**
 * 공지사항 게시글 페이지네이션
 * @param {import("./notices.service.type.js").page} page - 페이지 번호
 * @returns {Promise<Array<import("../../models/Notice.js").Notice>}
 */
async function pagination(page) {
  const limit = 10;
  const offset = limit * (page - 1);
  
  return await noticeRepository.pagination(null, { limit, offset });
}

/**
 * 공지사항 게시글 상세
 * @param {import("./notices.service.type.js").Id} id 
 * @returns {Promise<import("../../models/Notice.js").Notice>}
 */
async function show(id) {
  return await noticeRepository.findByPk(null, id);
}

export default {
  pagination,
  show,
}