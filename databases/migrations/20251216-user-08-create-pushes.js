/**
 * @file databases/migrations/20251216-user-08-create.pushes.js
 * @description pushes migration file
 * 251216 v1.0.0 N init
 */

import { DataTypes } from 'sequelize';

const tableName = 'pushes';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '푸시 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '유저 번호 (users)',
  },
  driverId: {
    field: 'driver_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '기사 번호 (drivers)',
  },
  adminId: {
    field: 'admin_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '관리자 번호 (admins)',
  },
  endpoint: {
    field: 'endpoint',
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true,
    comment: '엔드포인트',  // push server와 user 연결
  },
  p256dh: {
    field: 'p256dh',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '공개키',
  },
  auth: {
    field: 'auth',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '인증키',
  },
  device: {
    field: 'device',
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: '디바이스',
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