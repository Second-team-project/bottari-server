/**
 * @file databases/migrations/20251216-driver-01-create-drivers.js
 * @description drivers migration file
 * 251216 v1.0.0 김위민 init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'drivers';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '기사 번호',
  },
  driverName: {
    field: 'driver_name',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '기사 이름'
  },
  phone: {
    field: 'phone',
    type: DataTypes.STRING(25),
    unique: true,
    allowNull: false,
    comment: '기사 연락처',
  },
  accountId: {
    field: 'account_id',
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    comment: '기사 로그인 아이디'
  },
  passwordHash: {
    field: 'password_hash',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '기사 로그인 패스워드',
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: true,
    comment: '기사 이메일',
  },
  carNumber: {
    field: 'car_number',
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: '기사 차량번호',
  },
  notes: {
    field: 'notes',
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '기사 특이사항',
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프래시 토큰',
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
