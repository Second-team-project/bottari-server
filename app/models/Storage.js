/**
 * @file app/models/Storage.js
 * @description Storage model
 * 251216 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Storage'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '보관 PK',
  },
  reservId: {
    field: 'reserv_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '예약 번호 (reservations)',
  },
  startedAt: {
    field: 'started_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '보관 시작',
  },
  endedAt: {
    field: 'ended_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '보관 끝',
  },
  storeId: {
    field: 'store_id',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '보관소 번호 (stores)',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
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
    allowNull: false,
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
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

// 옵션 정의
const options = {
  tableName: 'storages', // 실제 DB 테이블명
  timestamps: true,   // createdAt, updatedAt를 자동 관리
  paranoid: true,     // soft delete 설정 (deletedAt 자동 관리)
}

// 모델 정의
const Storage = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  // 관계
  associate: (db) => {
    db.Storage.belongsTo(db.Reservation, { targetKey: 'id', foreignKey: 'reservId', as: 'storageReservation' });
    db.Storage.belongsTo(db.Store, { targetKey: 'id', foreignKey: 'storeId', as: 'storageStore' });
  }
}

export default Storage;