/**
 * @file databases/migrations/251216-admin-01-create.admins.js
 * @description admins migration file
 * 251216 v1.0.0 김민현 init
 */
import { DataTypes } from 'sequelize';

const tableName = 'admins';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '관리자 PK'
  },
  adminName: {
    field: 'admin_name',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '관리자 이름'
  },
  phone: {
    field: 'phone',
    type: DataTypes.STRING(25),
    unique: true,
    allowNull: false,
    comment: '연락처'
  },
  accountId: {
    field: 'account_id',
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    comment: '아이디'
  },
  passwordHash: {
    field: 'password_hash',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '비밀번호'
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: true,
    comment: '이메일'
  },
  code: {
    field: 'code',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '보관소 코드/본사 코드'
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프레쉬 토큰'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '작성일',
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '수정일',
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '삭제일',
  }
}

const options = {
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
  engine: 'InnoDB'
}

/** @type {import('sequelize-cli').Migration} <= 리턴 타입 */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, attributes, options);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};