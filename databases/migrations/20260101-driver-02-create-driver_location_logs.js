/**
 * @file databases/migrations/20260101-driver-01-create.driver_location.js
 * @description driver_location migration file
 * 260101 v1.0.0 N init
 */

import { DataTypes } from 'sequelize';

const tableName = 'driver_location_logs';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: 'PK',
  },
  driverId: {
    field: 'driver_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '기사 번호 (drivers)',
  },
  lat: {
    field: 'lat',
    type: DataTypes.DECIMAL(11,8),
    allowNull: false,
    comment: '위도',    
  },
  lng: {
    field: 'lng',
    type: DataTypes.DECIMAL(11,8),
    allowNull: false,
    comment: '경도',    
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