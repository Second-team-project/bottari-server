/**
 * @file databases/migrations/20251216-admin-06-create.pricing.js
 * @description pricing migration file
 * 251216 v1.0.0 김민현 init
 */
import { DataTypes } from 'sequelize';

const tableName = 'additional_pricing';

const attributes = {
 id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '요금 PK'
  },
  serviceType: {
    field: 'service_type',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '배송=D, 보관=S'
  },
  minValue: {
    field: 'min_value',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '최소 적용 거리/일수'
  },
  maxValue: {
    field: 'max_value',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '최대 적용 거리/일수'
  },
  rate: {
    field: 'rate',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '추가되는 비용의 비율(%)'
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