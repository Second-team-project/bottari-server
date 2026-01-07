/**
 * @file databases/migrations/20251216-admin-05-create.guide_img.js
 * @description guide_img migration file
 * 251216 v1.0.0 김민현 init
 */
import { DataTypes } from 'sequelize';

const tableName = 'guide_img';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '공지사항 PK'
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '이미지 제목'
  },
  type: {
    field: 'type',
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '배너=BANNER / 서비스안내=SERVICE / 요금안내=PRICE / 사용안내=USAGE'
  },
  img: {
    field: 'img',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '이미지',
  },
  imgEng: {
    field: 'img_eng',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '이미지eng',
  },
  active: {
    field: 'active',
    type: DataTypes.CHAR(1),
    allowNull: false,
    defaultValue: 'T',
    comment: '활성화=T / 비활성화=F'
  },
  sortOrder: {
    field: 'sort_order',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '출력 순서'
  },
  link: {
    field: 'link',
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '이벤트 연결 link'
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