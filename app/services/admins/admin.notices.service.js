/**
 * @file app/services/admin.notices.service.js
 * @description 관리자 공지사항 service
 * 251222 v1.0.0 김민현 init
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

/**
 * 공지사항 게시글 작성
 * @param {import("./notices.service.type.js").NoticeStoreData} data
 * @returns {Promise<import("../../models/Notice.js").Notice>}
 */
async function create(data) {
  return await noticeRepository.create(null, data);
}

/**
 * 공지사항 게시글 수정
 * @param {object} params
 * @param {number} params.adminId
 * @param {number} params.noticeId
 * @param {string} params.title
 * @param {string} params.content
 * @param {string|null} params.image
 */
async function update({ adminId, noticeId, title, content, img }) {
  return await db.sequelize.transaction(async t => {
    // 1. 게시글 존재 및 작성자 확인
    const notice = await noticeRepository.findByPk(t, noticeId);

    if (!notice) {
      throw customError('존재하지 않는 게시글입니다.', NOT_FOUND_ERROR);
    }
    
    if(notice.adminId !== adminId) {
      throw customError('작성자 불일치', UNMATCHING_USER_ERROR);
    }

    // 2. 수정할 데이터 준비
    const updateData = {
      title,
      content,
    };

    // 이미지가 새로 업로드된 경우에만 데이터에 포함 (업로드 안 하면 기존 이미지 유지)
    if (img) {
      updateData.img = img;
    }

    // 3. 업데이트 실행
    await noticeRepository.update(t, noticeId, updateData);
    
    // 4. 업데이트된 최신 정보 반환
    return await noticeRepository.findByPk(t, noticeId);
  });
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

    // 글이 있는지 체크
    if (!notice) {
      throw customError('존재하지 않는 게시글입니다.', NOT_FOUND_ERROR);
    }

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
  update,
  destroy,
}