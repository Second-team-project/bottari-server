/**
 * @file app/models/Admin.js
 * @description Admin model
 * 251216 v1.0.0 김민현 init
 */
import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Admin'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '관리자 PK'
  },
  adminName: {
    field: 'admin_name',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '관리자 이름'
  },
  phone: {
    field: 'phone',
    type: DataTypes.STRING(25),
    unique: true,
    allowNull: false,
    comment: '연락처'
  },
  accountId: {
    field: 'account_id',
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    comment: '아이디'
  },
  passwordHash: {
    field: 'password_hash',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '비밀번호'
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: true,
    comment: '이메일'
  },
  code: {
    field: 'code',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '보관소 코드/본사 코드'
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프레쉬 토큰'
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
  tableName: 'admins',
  timestamps: true,
  paranoid: true
}

// 모델 정의
const Admin = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.Admin.hasMany(db.Notice, { sourceKey: 'id', foreignKey: 'admin_id', as: 'adminIdNotices' });
    db.Admin.hasMany(db.FAQ, { sourceKey: 'id', foreignKey: 'admin_id', as: 'adminIdFAQ' });
  }
}

export default Admin;