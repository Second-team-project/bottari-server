/**
 * @file databases/migrations/20260107-chat-02-create-chat-messages.js
 * @description chat_messages migration file
 * 260107 v1.0.0 init
 */

import { DataTypes } from 'sequelize';

const tableName = 'chat_messages';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '메시지 PK',
  },
  roomId: {
    field: 'room_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '채팅방 ID (chat_rooms FK)',
  },
  senderType: {
    field: 'sender_type',
    type: DataTypes.ENUM('USER', 'ADMIN'),
    allowNull: false,
    comment: '발신자 타입: USER(유저) / ADMIN(관리자)',
  },
  adminId: {
    field: 'admin_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '관리자 ID (admins) - 관리자 발신일 때만',
  },
  content: {
    field: 'content',
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '메시지 내용 또는 이미지 URL',
  },
  messageType: {
    field: 'message_type',
    type: DataTypes.ENUM('TEXT', 'IMAGE'),
    allowNull: false,
    defaultValue: 'TEXT',
    comment: '메시지 타입: TEXT(텍스트) / IMAGE(이미지)',
  },
  isRead: {
    field: 'is_read',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '읽음 여부',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: false,
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
  },
};

const options = {
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
  engine: 'InnoDB',
};

/** @type {import('sequelize-cli').Migration} */
export default {

  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, attributes, options);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};
