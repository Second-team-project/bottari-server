/**
 * @file databases/migrations/20260107-chat-01-create-chat-rooms.js
 * @description chat_rooms migration file
 * 260107 v1.0.0 init
 */

import { DataTypes } from 'sequelize';

const tableName = 'chat_rooms';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '채팅방 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '회원 유저 ID (users)',
  },
  bookerId: {
    field: 'booker_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '비회원 예약자 ID (bookers)',
  },
  isBlocked: {
    field: 'is_blocked',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '차단 여부',
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
