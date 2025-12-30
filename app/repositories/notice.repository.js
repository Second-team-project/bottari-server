/**
 * @file app/repositories/notice.repository.js
 * @description Notice Repository
 * 251222 v1.0.0 김민현 init
 */
import db from '../models/index.js';
const { sequelize, Notice } = db;

/**
 * 공지사항 게시글 페이지네이션
 * @param {import("sequelize").Transaction|null} t 
 * @param {{limit: number, offset: number}} data 
 * @returns {Promise<Array<import("../models/Notice.js").Notice>}
 */
async function pagination(t = null, data) {
  return await Notice.findAndCountAll({
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'DESC'],
        ['id', 'ASC'],
      ],
      limit: data.limit,
      offset: data.offset,
      transaction: t,
    });
}

/**
 * 공지사항 게시글 ID로 조회
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../services/admins/notices.service.type.js").Id} id 
 * @returns {Promise<import("../models/Notice.js").Notice>}
 */
async function findByPk(t = null, id) {
  return await Notice.findByPk(
    id,
    {
      transaction: t
    }
  );
}

/**
 * 공지사항 게시글 작성
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../services/admins/notices.service.type.js").NoticeStoreData} data 
 * @returns {Promise<import("../models/Notice.js").Notice>}
 */
async function create(t = null, data) {
  return await Notice.create(data);
}

/**
 * 공지사항 게시글 수정
 * @param {import("sequelize").Transaction|null} t 
 * @param {number} id 
 * @param {object} data 
 * @returns {Promise<number>}
 */
async function update(t = null, id, data) {
  return await Notice.update(data, {
    where: { id: id },
    transaction: t
  });
}

/**
 * 공지사항 게시글 삭제
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../services/admins/notices.service.type.js").Id} id 
 * @returns {Promise<number>}
 */
async function destroy(t = null, noticeId) {
  return await Notice.destroy(
    {
      where: { id : noticeId },
      transaction: t
    }
  );
}

export default {
  pagination,
  findByPk,
  create,
  update,
  destroy
}