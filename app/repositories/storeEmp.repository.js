/**
 * @file app/repositories/storeEmp.repository.js
 * @description StoreEmp Repository
 * 250101 v1.0.0 김민현 init
 */
import db from '../models/index.js';
const { Admin } = db;

/**
 * 직원 관리 페이지네이션
 * @param {import("sequelize").Transaction|null} t 
 * @param {{limit: number, offset: number}}
 * @returns
 */
async function pagination(t = null, { limit, offset, where }) {
  return await Admin.findAndCountAll({
    where: where,
    order: [
      ['createdAt', 'DESC'],
      ['updatedAt', 'DESC'],
      ['id', 'ASC'],
    ],
    limit: limit,
    offset: offset,
    transaction: t,
  });
}

/**
 * id로 직원 정보 조회
 * @param {import("sequelize").Transaction} t 
 * @param {number} id 
 * @returns {Promise<import("../models/Admin.js").Admin>}
 */
async function findByPk(t = null, id) {
  return await Admin.findByPk(id, { transaction: t });
}

/**
 * 모델 인스턴스로 save 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js")} admin 
 * @returns {Promise<import("../models/Admin.js").Admin>}
 */
async function save(t = null, admin) {
  return await admin.save({ transaction: t });
}

/**
 * 로그인용 id로 직원 검색
 * @param {import("sequelize").Transaction} t 
 * @param {string} accountId 
 * @returns {Promise<import("../models/Admin.js").Admin>}
*/
async function findByAccountId(t = null, id) {
  return await Admin.findOne(
    {
      where: {
        accountId: id,
      },
      transaction: t
    }
  );
}

/**
 * 휴대폰 번호로 직원 검색
 */
async function findByPhone(t = null, phone) {
  return await Admin.findOne({
    where: {
      phone: phone
    },
    transaction: t
  });
}

/**
 * 직원 정보 생성
 */
async function create(t = null, data) {
  return await Admin.create(data, { transaction: t });
}

/**
 * 직원 정보 삭제
 */
async function destroy(t = null, id) {
  return await Admin.destroy({
    where: {
      id: id
    },
    transaction: t
  });
}

export default {
  findByAccountId,
  save,
  findByPk,
  findByPhone,
  pagination,
  create,
  destroy,
}