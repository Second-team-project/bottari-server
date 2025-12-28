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

export default {
  findByAccountId,
  save,
  findByPk,
}