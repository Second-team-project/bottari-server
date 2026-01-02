/**
 * @file app/models/DriverEditProfileLog.js
 * @description DriverEditProfileLog model
 * 251226 v1.0.0 김위민 init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'DriverEditProfileLog'; // 모델명 (JS 내부에서 사용)

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '기사 개인정보 변경 이력 번호',
  },
  driverId: {
    field: 'driver_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '기사 번호 FK'
  },
  editFieldName: {
    field: 'edit_field_name',
    type: DataTypes.STRING(15),
    allowNull: false,
    comment: '변경된 필드명',
  },
  oldValue: {
    field: 'old_value',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '변경 전 값'
  },
  newValue: {
    field: 'new_value',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '변경 후 값',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
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
  tableName: 'driver_edit_profile_logs', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt를 자동 관리
  paranoid: true, // soft delete 설정 (deletedAt 자동 관리)
}

const DriverEditProfileLog = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.DriverEditProfileLog.belongsTo(db.Driver, { targetKey: 'id', foreignKey: 'driverId', as: 'driverEditProfileLogDriver' });
  }
}

export default DriverEditProfileLog;