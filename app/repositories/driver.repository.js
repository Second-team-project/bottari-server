/**
 * @file app/repositories/driver.repository.js
 * @description Driver Repository
 * 251222 v1.0.0 김위민 init
 */

import db from '../models/index.js';
const { Driver } = db;

/**
 * 로그인 용 id로 유저 검색
 * @param {import("sequelize").Transaction} t 
 * @param {string} accountId 
 * @returns {Promise<import("../models/Driver.js").Driver>}
*/
async function findByAccountId(t = null, id) {
  return await Driver.findOne(
    {
      where: {
        accountId: id,
      },
      transaction: t
    }
  );
}

/**
 * 유저 모델 인스턴스로 save 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js")} driver 
 * @returns {Promise<import("../models/Driver.js").Driver>}
 */
async function save(t = null, driver) {
  return await driver.save({ transaction: t });
}

/**
 * 유저id로 유저정보 조회
 * @param {import("sequelize").Transaction} t 
 * @param {number} id 
 * @returns {Promise<import("../models/User.js").User>}
 */
async function findByPk(t = null, id) {
  return await Driver.findByPk(id, { transaction: t });
}

/**
 * 기사 로그아웃
 */
async function driverLogout(t= null, id) {
  return await Driver.update(
    {
      refreshToken: null,
    },
    {
      where: {
        id: id
      },
      transaction: t
    }
  );
}

/**
 * 휴대폰 번호로 기사 검색(중복 체크용)
 */
async function findByPhone(t = null, phone) {
  return await Driver.findOne({
    where: {
      phone: phone
    },
    transaction: t
  });
}

/**
 * 기사 관리 페이지네이션
 * @param {import("sequelize").Transaction|null} t 
 * @param {{limit: number, offset: number}}
 * @returns
 */
async function pagination(t = null, { limit, offset, where }) {
  return await Driver.findAndCountAll({
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
 * 기사 정보 생성
 */
async function create(t = null, data) {
  return await Driver.create(data, { transaction: t });
}

/**
 * 기사 삭제
 */
async function destroy(t = null, id) {
  return await Driver.destroy({
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
  driverLogout,
  findByPhone,
  pagination,
  create,
  destroy,
}