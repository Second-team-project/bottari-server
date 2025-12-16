/**
 * @file app/models/DriverAssignment.js
 * @description DriverAssignment model
 * 251216 v1.0.0 김위민 init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'DriverAssignment'; // 모델명 (JS 내부에서 사용)

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '기사 배정 이력 번호',
  },
  driverId: {
    field: 'driver_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '기사 번호 FK'
  },
  reservId: {
    field: 'reserv_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '예약 번호 FK',
  },
  assignedAt: {
    field: 'assigned_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '배정 일시'
  },
  unassignedAt: {
    field: 'unassigned_at',
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true,
    comment: '배정 해제 일시',
  },
  state: {
    field: 'state',
    type: DataTypes.STRING(15),
    defaultValue: 'ASSIGNED',
    allowNull: false,
    comment: '배정 해제 일시',
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
  tableName: 'driver_assignments', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt를 자동 관리
  paranoid: true, // soft delete 설정 (deletedAt 자동 관리)
}

const DriverAssignment = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {

  }
}

export default DriverAssignment;