/**
 * @file databases/migrations/20251216-driver-02-create-driver_attendance_logs.js
 * @description driver_attendance_logs migration file
 * 251216 v1.0.0 김위민 init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'driver_attendance_logs';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '출퇴근 이력 번호',
  },
  driverId: {
    field: 'driver_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '기사 번호 FK'
  },
  clockInAt: {
    field: 'clock_in_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '출근 시간',
  },
  clockOutAt: {
    field: 'clock_out_at',
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true,
    comment: '퇴근 시간'
  },
  state: {
    field: 'state',
    type: DataTypes.STRING(15),
    defaultValue: 'CLOCKED_IN',
    allowNull: false,
    comment: '현재 상태',
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
