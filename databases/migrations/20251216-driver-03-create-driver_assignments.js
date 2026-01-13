/**
 * @file databases/migrations/20251216-driver-03-create-driver_assignments.js
 * @description driver_assignments migration file
 * 251216 v1.0.0 김위민 init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'driver_assignments';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '기사 배정 이력 번호',
  },
  driverId: {
    field: 'driver_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '기사 번호 FK'
  },
  reservId: {
    field: 'reserv_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '예약 번호 FK',
  },
  assignedAt: {
    field: 'assigned_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '배정 일시'
  },
  unassignedAt: {
    field: 'unassigned_at',
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true,
    comment: '배정 해제 일시',
  },
  state: {
    field: 'state',
    type: DataTypes.STRING(15),
    defaultValue: 'ASSIGNED',
    allowNull: false,
    comment: '배정 해제 일시',
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
