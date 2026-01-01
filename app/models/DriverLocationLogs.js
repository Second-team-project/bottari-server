/**
 * @file app/models/DrvierLocation.js
 * @description DrvierLocation model
 * 260101 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'DriverLocationLogs'; // 모델명(JS 내부에서 사용)

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: 'PK',
  },
  driverId: {
    field: 'driver_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '기사 번호 (drivers)',
  },
  lat: {
    field: 'lat',
    type: DataTypes.DECIMAL(11,8),
    allowNull: false,
    comment: '위도',    
  },
  lng: {
    field: 'lng',
    type: DataTypes.DECIMAL(11,8),
    allowNull: false,
    comment: '경도',    
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

const options = {
  tableName: 'driver_location_logs', // 실제 DB 테이블명
  timestamps: true,   // createdAt, updatedAt를 자동 관리
  paranoid: true,     // soft delete 설정 (deletedAt 자동 관리)
}

// 모델 정의
const DriverLocationLogs = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },

  associate: (db) => {
    db.DriverLocationLogs.belongsTo(db.Driver, { targetKey: 'id', foreignKey: 'driverId', as: 'driverLocationLogsDriver' });

  }
}

export default DriverLocationLogs;