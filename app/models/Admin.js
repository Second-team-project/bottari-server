/**
 * @file app/models/Admin.js
 * @description Admin model
 * 251216 v1.0.0 김민현 초기 작성
 */
import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Admin';

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
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(225),
    allowNull: true,
    comment: '리프래쉬 토큰'
  },
  code: {
    field: 'code',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '보관소 코드/본사 코드'
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

const options = {
  tableName: 'admins',
  timestamps: true,
  paranoid: true
}

export default Admin;