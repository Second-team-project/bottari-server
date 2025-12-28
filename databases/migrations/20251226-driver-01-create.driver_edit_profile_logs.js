/**
 * @file databases/migrations/20251226-driver-01-create.driver_edit_profile_logs.js
 * @description driver_edit_profile_logs migration file
 * 251226 v1.0.0 김위민 init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'driver_edit_profile_logs';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '기사 개인정보 변경 이력 번호',
  },
  driverId: {
    field: 'driver_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '기사 번호 FK'
  },
  editFieldName: {
    field: 'edit_field_name',
    type: DataTypes.STRING(15),
    allowNull: false,
    comment: '변경된 필드명',
  },
  oldValue: {
    field: 'old_value',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '변경 전 값'
  },
  newValue: {
    field: 'new_value',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '변경 후 값',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
  }
};

// 옵션 설정
const options = {
  charset: 'utf8mb4', // 테이블 문자셋 설정(이모지 지원)
  collate: 'utf8mb4_0900_ai_ci', // 정렬 방식 설정
  engine: 'InnoDB', // 사용 엔진 설정
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