/**
 * @file app/repositories/chatMessage.repository.js
 * @description chatMessage Repository
 * 260110 v1.0.0 N init
 */

import db from '../models/index.js';
const { ChatMessage, } = db;

/**
 * 특정 채팅방의 메시지 목록 조회
 * @param {import("sequelize").Transaction} t
 * @param {number} roomId
 * @returns
 */
async function findMessagesByRoomId(t = null, roomId) {
  return await ChatMessage.findAll({
    where: { roomId },
    order: [['createdAt', 'ASC']],
    transaction: t,
  });
}

export default {
  findMessagesByRoomId,
}
