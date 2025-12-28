/**
 * @file app/models/Store.js
 * @description Store model
 * 251216 v1.0.0 김민현 init
 */
import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Store'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
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

// 옵션 정의
const options = {
  tableName: 'stores',
  timestamps: true,
  paranoid: true
}

// 모델 정의
const Store = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.Store.hasMany(db.Storage, { sourceKey: 'id', foreignKey: 'store_id', as: 'storeIdStores' });
  }
}

export default Store;