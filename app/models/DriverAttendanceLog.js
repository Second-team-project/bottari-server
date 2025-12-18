/**
 * @file app/models/DriverAttendanceLog.js
 * @description DriverAttendanceLog model
 * 251216 v1.0.0 김위민 init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'DriverAttendanceLog'; // 모델명 (JS 내부에서 사용)

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '출퇴근 이력 번호',
  },
  driverId: {
    field: 'driver_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '기사 번호 FK'
  },
  clockInAt: {
    field: 'clock_in_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '출근 시간',
  },
  clockOutAt: {
    field: 'clock_out_at',
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true,
    comment: '퇴근 시간',
  },
  state: {
    field: 'state',
    type: DataTypes.STRING(15),
    defaultValue: 'CLOCKED_IN',
    allowNull: false,
    comment: '현재 상태',
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
  tableName: 'driver_attendance_logs', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt를 자동 관리
  paranoid: true, // soft delete 설정 (deletedAt 자동 관리)
}

const DriverAttendanceLog = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.DriverAttendanceLog.belongsTo(db.Driver, { targetKey: 'id', foreignKey: 'driver_id', as: 'driverAttendanceLogDriver' });
  }
}

export default DriverAttendanceLog;