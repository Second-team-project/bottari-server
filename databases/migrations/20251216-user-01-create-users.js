/**
 * @file databases/migrations/20251216-user-01-create-users.js
 * @description users migration file
 * 251216 v1.0.0 N init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'users';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '유저 PK',
  },
  userName: {
    field: 'user_name',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '이름',
  },
  phone: {
    field: 'phone',
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true,
    comment: '연락처',
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: '이메일',
  },
  provider: {
    field: 'provider',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '로그인 제공자 : KAKAO, GOOGLE',
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프레시 토큰',
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