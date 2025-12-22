/**
 * @file app/repositories/driver.repository.js
 * @description Driver Repository
 * 251222 v1.0.0 김위민 init
 */

import db from '../models/index.js';
const { Driver } = db;

/**
 * id로 유저 검색
 * @param {import("sequelize").Transaction} t 
 * @param {string} id 
 * @returns {Promise<import("../models/Driver.js").Driver>}
*/
async function findById(t = null, id) {
  return await Driver.findOne(
    {
      where: {
        id: id,
      },
      transaction: t
    }
  );
}

/**
 * 유저 모델 인스턴스로 save 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js")} user 
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
  findById,
  save,
  findByPk,
}