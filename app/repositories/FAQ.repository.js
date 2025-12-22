/**
 * @file app/repositories/FAQ.repository.js
 * @description FAQ Repository
 * 251222 v1.0.0 김민현 init
 */
import db from '../models/index.js';
const { sequelize, FAQ } = db;

/**
 * FAQ 페이지네이션
 * @param {import("sequelize").Transaction|null} t 
 * @param {{limit: number, offset: number}} data 
 * @returns {Promise<Array<import("../models/FAQ.js").FAQ>}
 */
async function pagination(t = null, data) {
  return await FAQ.findAndCountAll({
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
 * FAQ ID로 조회
 * @param {import("sequelize").Transaction|null} t 
 * @returns {Promise<import("../models/FAQ.js").FAQ>}
 */
async function findByPk(t = null, id) {
  return await FAQ.findByPk(
    id,
    {
      transaction: t
    }
  );
}

/**
 * FAQ 글 작성
 * @param {import("sequelize").Transaction|null} t 
 * @returns {Promise<import("../models/FAQ.js").FAQ>}
 */
async function create(t = null, data) {
  return await FAQ.create(data);
}

/**
 * FAQ 삭제
 * @param {import("sequelize").Transaction|null} t 
 * @returns {Promise<number>}
 */
async function destroy(t = null, id) {
  return await FAQ.destroy(
    {
      where: { id : id },
      transaction: t
    }
  );
}

export default {
  pagination,
  findByPk,
  create,
  destroy
}