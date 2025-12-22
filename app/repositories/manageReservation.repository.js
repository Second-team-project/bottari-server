/**
 * @file app/repositories/manageReservation.repository.js
 * @description 예약 관리 Repository
 * 251222 v1.0.0 김민현 init
 */
import db from '../models/index.js';
const { sequelize, Reservation, User, Storage, Delivery } = db;

/**
 * 예약 목록 페이지네이션
 * @param {import("sequelize").Transaction|null} t 
 * @param {{limit: number, offset: number}} data 
 * @returns {Promise<Array<import("../models/Reservation.js").Reservation>}
 */
async function pagination(t = null, data) {
  // TODO: Driver JOIN 해야 함
  return await Reservation.findAndCountAll({
      include: [{
        model: User,
        attributes: ['userName', 'phone'],
      }],
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
 * 예약 목록 ID로 조회
 * @param {import("sequelize").Transaction|null} t 
 * @param {number} id
 * @returns {Promise<import("../models/Reservation.js").Reservation>}
 */
async function findByPk(t = null, id) {
  // TODO : User, Luggage, Driver, Storage JOIN해야 함
  return await Reservation.findByPk(
    id,
    {
      include: [{
        model: User,
        attributes: ['userName', 'phone', 'email'],
      }],
      transaction: t
    }
  );
}

/**
 * 예약 등록
 * @param {import("sequelize").Transaction|null} t 
 * @returns {Promise<import("../models/Reservation.js").Reservation>}
 */
async function create(t = null, data) {
  return await Reservation.create(data);
}

/**
 * 예약 정보 삭제
 * @param {import("sequelize").Transaction|null} t 
 * @returns {Promise<number>}
 */
async function destroy(t = null, id) {
  return await Reservation.destroy(
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