/**
 * @file app/services/admin.notices.service.js
 * @description 관리자 공지사항 service
 * 251222 v1.0.0 김민현 init
 */
import { UNMATCHING_USER_ERROR } from "../../../configs/responseCode.config.js";
import customError from "../../errors/custom.error.js";
import db from "../../models/index.js";
import noticeRepository from "../../repositories/notice.repository.js";

/**
 * 공지사항 게시글 페이지네이션
 * @param {import("./notices.service.type.js").page} page - 페이지 번호
 * @returns {Promise<Array<import("../../models/Notice.js").Notice>}
 */
async function pagination(page) {
  const limit = 6;
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

/**
 * 공지사항 게시글 작성
 * @param {import("./notices.service.type.js").NoticeStoreData} data
 * @returns {Promise<import("../../models/Notice.js").Notice>}
 */
async function create(data) {
  // return await db.sequelize.transaction(async t => {return await postRepository.create(t, data);})
  return await noticeRepository.create(null, data);
}

/**
 * 공지사항 게시글 삭제
 * @param {import("./notices.service.type.js").NoticeDestroyData} data 
 * @returns {Promise<number>}
 */
async function destroy({ adminId, noticeId }) {
  // 트랜잭션 시작
  return await db.sequelize.transaction(async t => {
    // (게시글 작성자 일치 확인용)
    const notice = await noticeRepository.findByPk(t, noticeId);

    // 게시글 작성자 일치 확인
    if(notice.adminId !== adminId) {
      throw customError('작성자 불일치', UNMATCHING_USER_ERROR);
    }
    
    // 게시글 삭제 <= 부모 테이블이기 때문에 foreignKey가 걸려 있어서 가장 마지막에 삭제해야 함.
    await noticeRepository.destroy(t, noticeId);
  });
  
}

export default {
  pagination,
  show,
  create,
  destroy,
}