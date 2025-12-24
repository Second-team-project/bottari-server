/**
 * @file databases/migrations/20251216-user-06-create.luggages.js
 * @description luggages migration file
 * 251216 v1.0.0 N init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'luggages';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '짐 PK',
  },
  reservId: {
    field: 'reserv_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '예약 번호 (reservations)',
  },
  itemType: {
    field: 'item_type',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '짐 타입 : CARRIER, BAG, BOX, GOLF',    
  },
  itemWeight: {
    field: 'item_weight',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '짐 무게 : UNDER_10, UNDER_20, UNDER_30, OVER_30',    
  },
  itemSize: {
    field: 'item_size',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '짐 크기 : CARRIER:21,24,32,OVER / BAG,BOX: S,M,L,XL / GOLF=null',    
  },
  notes: {
    field: 'notes',
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    comment: '요청 사항',
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

// 옵션
const options = {
  charset: 'utf8mb4',              // 테이블 문자셋 설정 : 이모지 지원
  collate: 'utf8mb4_0900_ai_ci',   // 정렬 방식 설정 : 영어 대/소문자 및 악센트 구분없이,
  engine: 'InnoDB',                // 사용 엔진 설정
};

// ↱ export한 return type : migration
/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ donw : 세트. 상반되는 반대 처리

  //     ↱ up() : 스키마 생성과 관련. migration 실행 시 호출되는 메소드
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, attributes, options);
  },
  
  //     ↱ down() : 스키마 제거, 수정 관련. migration 롤백 시 호출되는 메소드
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};