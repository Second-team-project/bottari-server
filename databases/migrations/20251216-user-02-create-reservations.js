/**
 * @file databases/migrations/20251216-user-02-create.reservations.js
 * @description reservations migration file
 * 251216 v1.0.0 N init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'reservations';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '예약 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '유저 번호 (users)',
  },
  code: {
    field: 'code',
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
    comment: '예약 코드',
  },
  state: {
    field: 'state',
    type: DataTypes.STRING(15),
    allowNull: false,
    comment: '예약 상태: 결제대기=PENDING_PAYMENT / 예약중=RESERVED / 진행중=IN_PROGRESS / 완료=COMPLETED / 취소=CANCELLED',
  },
  price: {
    field: 'price',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '결제 금액',
  },
  paymentKey: {
    field: 'payment_key',
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null,
    comment: 'Toss 결제 키 (취소/조회용)'
  },
  paymentMethod: {
    field: 'payment_method',
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null,
    comment: '결제 수단'
  },
  approvedAt: {
    field: 'approved_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '결제 승인 시각 (ISO 8601)'
  },
  cancelReason: {
    field: 'cancel_reason',
    type: DataTypes.STRING(225),
    allowNull: true,
    defaultValue: null,
    comment: '취소 사유',
  },
  notes: {
    field: 'notes',
    type: DataTypes.STRING(500),
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