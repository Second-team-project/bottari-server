/**
 * @file app/repositories/chatRoom.repository.js
 * @description chatRoom Repository
 * 260110 v1.0.0 N init
 */

import db from '../models/index.js';
const { ChatRoom, User, Booker } = db;

/**
 * 전체 채팅방 목록 조회 (관리자용)
 * @param {import("sequelize").Transaction} t
 * @returns
 */
async function findAll(t = null) {
  return await ChatRoom.findAll({
    include: [
      {
        model: User,
        as: 'chatRoomUser',
        attributes: ['id', 'userName', 'email'],
      },
      {
        model: Booker,
        as: 'chatRoomBooker',
        attributes: ['id', 'userName', 'email', 'reservId'],
      },
    ],
    order: [['updatedAt', 'DESC']],
    transaction: t,
  });
}

/**
 * user_id로 채팅방 조회
 * @param {import("sequelize").Transaction} t
 * @param {number} userId
 * @returns
 */
async function findByUserId(t = null, userId) {
  return await ChatRoom.findOne({
    where: { userId },
    transaction: t,
  });
}

/**
 * booker_id로 채팅방 조회
 * @param {import("sequelize").Transaction} t
 * @param {number} bookerId
 * @returns
 */
async function findByBookerId(t = null, bookerId) {
  return await ChatRoom.findOne({
    where: { bookerId },
    transaction: t,
  });
}

/**
 * 채팅방 id로 조회
 * @param {import("sequelize").Transaction} t
 * @param {number} id
 * @returns
 */
async function findRoomById(t = null, id) {
  return await ChatRoom.findByPk(id, { transaction: t });
}

/**
 * 채팅방 생성
 * @param {import("sequelize").Transaction} t
 * @param {object} data - { userId } 또는 { bookerId }
 * @returns
 */
async function create(t = null, data) {
  return await ChatRoom.create(data, { transaction: t });
}

/**
 * 채팅방 정보 수정
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
async function update(t = null, { id, isBlocked }) {
  return await ChatRoom.update(
    { isBlocked },
    {
      where: { id },
      transaction: t,
    }
  )
}

export default {
  findAll,
  findByUserId,
  findByBookerId,
  findRoomById,
  create,
  update,
}
