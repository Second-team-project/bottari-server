/**
 * @file databases/migrations/20251216-user-04-create.storages.js
 * @description storages migration file
 * 251216 v1.0.0 N init
 */

import { DataTypes } from 'sequelize';

const tableName = 'storages';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '보관 PK',
  },
  reservId: {
    field: 'reserv_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '예약 번호 (reservations)',
  },
  startedAt: {
    field: 'started_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '보관 시작',
  },
  endedAt: {
    field: 'ended_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '보관 끝',
  },
  storeId: {
    field: 'store_id',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '보관소 번호 (stores)',
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
  charset: 'utf8mb4',              // 테이블 문자셋 설정 : 이모지 지원
  collate: 'utf8mb4_0900_ai_ci',   // 정렬 방식 설정 : 영어 대/소문자 및 악센트 구분없이,
  engine: 'InnoDB',                // 사용 엔진 설정
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