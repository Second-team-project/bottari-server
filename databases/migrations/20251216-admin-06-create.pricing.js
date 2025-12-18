/**
 * @file databases/migrations/20251216-admin-06-create.pricing.js
 * @description pricing migration file
 * 251216 v1.0.0 김민현 init
 */
import { DataTypes } from 'sequelize';

const tableName = 'pricing';

const attributes = {
 id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '요금 PK'
  },
  itemType: {
    field: 'item_type',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '캐리어=CARRIER / 가방=BAG / 상자=BOX / 골프가방=GOLF'
  },
  itemSize: {
    field: 'item_size',
    type: DataTypes.STRING(5),
    allowNull: true,
    comment: 'CARRIER:21,24,32,OVER / BAG,BOX: S,M,L,XL / GOLF=null'
  },
  itemWeight: {
    field: 'item_weight',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: 'UNDER_10, UNDER_20, UNDER_30, OVER_30'
  },
  serviceType: {
    field: 'service_type',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '배송=D, 보관=S'
  },
  basePrice: {
    field: 'base_price',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '기본 가격'
  },
  minKm: {
    field: 'min_km',
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null,
    comment: '최소 거리'
  },
  maxKm: {
    field: 'max_km',
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null,
    comment: '최대 거리'
  },
  addPrice: {
    field: 'add_price',
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null,
    comment: '추가 비용'
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