/**
 * @file app/repositories/stat.repository.js
 * @description 통계 관련 Repository
 * 251230 v1.0.0 김민현 init
 */
import { Op } from 'sequelize';
import db from '../models/index.js';
const { sequelize, Reservation } = db;

/**
 * 총 매출 및 예약 건수 조회
 */
async function findByState(t) {
return await Reservation.findAll({
    where: {
      state: {
        [Op.ne]: 'CANCELLED' // state가 'CANCELLED'와 같지 않은(ne)것만 조회
      }
    },
    order: [['created_at', 'DESC']],
    transaction: t
  });
}

export default {
  findByState,
};