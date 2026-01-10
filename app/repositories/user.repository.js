/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251217 v1.0.0 N init
 */

import db from '../models/index.js';
const { User, Reservation } = db;

/**
 * 이메일로 유저 검색
 * @param {import("sequelize").Transaction} t 
 * @param {string} email 
 * @returns 
 */
async function findByEmail(t = null, email) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await User.findOne(
    {
      where: {
        email: email
      },
      //           ↱ 받은 transaction 들어감 → 이 쿼리 과정을 transaction 처리
      transaction: t
    }
  );
}

/**
 * 유저 모델 인스턴스로 save 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js").User} user 
 * @returns 
 */
async function save(t = null, user) {
  return await user.save(
    {
      transaction: t,
    }
  );
}

/**
 * 유저 id로 조회
 * @param {import("sequelize").Transaction} t 
 * @param {number} id 
 * @returns {Promise<ImportAttributes("../models/User.js").User>}
 */
async function findByPk(t = null, id) {
  return await User.findByPk(id, {transaction: t});
}

/**
 * 유저 생성
 * @param {*} t 
 * @param {*} data 
 * @returns 
 */
async function create(t = null, data) {
  return await User.create(data, { transaction: t });
}

/**
 * 유저 로그아웃
 * @param {*} t 
 * @param {*} id 
 * @returns 
 */
async function logout(t = null, id) {
  return await User.update(
    {
      refreshToken: null
    },
    {
      where: {
        id: id
      },
      transaction: t
    }
  );
}

// ===== 관리자 페이지

/**
 * 유저 페이지네이션
 * @param {*} t 
 * @param {*} data 
 * @returns 
 */
async function pagination(t = null, { where, offset, limit }) {
  return await User.findAndCountAll({
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'DESC'],
      ],
      limit,
      offset,
      where,
      transaction: t,
    });
}

/**
 * 유저 id로 조회 + 예약 통계 가져오기
 * @param {import("sequelize").Transaction} t 
 * @param {number} id 
 * @returns {Promise<ImportAttributes("../models/User.js").User>}
 */
async function findByPkJoinReservation(t = null, { id }) {
  return await User.findByPk(
    id, 
    {
      // 통계 데이터
      attributes: {
        include: [
          [
            db.sequelize.literal(`(
              SELECT COALESCE(SUM(price), 0)
                FROM reservations AS r
                WHERE r.user_id = User.id
                AND r.state = 'COMPLETED'
                AND r.deleted_at IS NULL
            )`),
            'totalPayment'
          ],
          [
            db.sequelize.literal(`(
              SELECT COUNT(*)
              FROM reservations AS r
              WHERE r.user_id = User.id
              AND r.deleted_at IS NULL
            )`),
            'reservationCount'
          ]
        ]
      },
      include: [
        {
          model: Reservation,
          as: 'userIdReservations',
          limit: 5,
          order: [
            ['createdAt', 'DESC']
          ]
        }
      ],
      transaction: t
    }
  );
}

/**
 * 유저 수정 - statu, adminMemo
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function update(t = null, { id, status, adminMemo }) {
  return await User.update(
    {
      status,
      adminMemo, 
    },
    {
      where: { id },
      transaction: t
    }
  )
}

/**
 * 유저 삭제
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function destroy(t = null, { id }) {
  return await User.destroy(
    {
      where: { id },
      transaction: t
    }
  );
}

export default {
  findByEmail,
  save,
  findByPk,
  create,
  logout,

  pagination,
  findByPkJoinReservation,
  update,
  destroy,
}