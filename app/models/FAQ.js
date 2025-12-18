/**
 * @file app/models/FAQ.js
 * @description FAQ model
 * 251216 v1.0.0 김민현 init
 */
import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'FAQ'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: 'FAQ PK'
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
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '수정일',
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '삭제일',
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}

// 옵션 정의
const options = {
  tableName: 'FAQ',
  timestamps: true,
  paranoid: true
}

// 모델 정의
const FAQ = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.FAQ.belongsTo(db.Admin, { targetKey: 'id', foreignKey: 'admin_id', as: 'admin' });
  }
}

export default FAQ;