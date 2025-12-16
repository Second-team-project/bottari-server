/**
 * @file app/models/Store.js
 * @description Store model
 * 251216 v1.0.0 김민현 초기 작성
 */
import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Store';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '보관소 PK'
  },
  storeName: {
    field: 'store_name',
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
    comment: '보관소 이름'
  },
  code: {
    field: 'code',
    type: DataTypes.STRING(10),
    unique: true,
    allowNull: false,
    comment: '보관소 코드'
  },
  addr: {
    field: 'addr',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '주소'
  },
  tel: {
    field: 'tel',
    type: DataTypes.STRING(25),
    unique: true,
    allowNull: false,
    comment: '전화번호'
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

export default Store;