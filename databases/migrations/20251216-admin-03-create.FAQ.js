/**
 * @file databases/migrations/20251216-admin-03-create.FAQ.js
 * @description FAQ migration file
 * 251216 v1.0.0 김민현 init
 */
import { DataTypes } from 'sequelize';

const tableName = 'FAQ';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '공지사항 PK'
  },
  adminId: {
    field: 'admin_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '관리자 PK'
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '제목'
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(2000),
    allowNull: false,
    comment: '내용'
  },
  img: {
    field: 'img',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '이미지',
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