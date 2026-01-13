/**
 * @file databases/migrations/20251216-admin-04-create.stores.js
 * @description stores migration file
 * 251216 v1.0.0 김민현 init
 */
import { DataTypes } from 'sequelize';

const tableName = 'stores';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '보관소 PK'
  },
  storeName: {
    field: 'store_name',
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
    comment: '보관소 이름'
  },
  code: {
    field: 'code',
    type: DataTypes.STRING(10),
    unique: true,
    allowNull: false,
    comment: '보관소 코드'
  },
  addr: {
    field: 'addr',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '주소'
  },
  tel: {
    field: 'tel',
    type: DataTypes.STRING(25),
    unique: true,
    allowNull: false,
    comment: '전화번호'
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