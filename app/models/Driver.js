/**
 * @file app/models/Driver.js
 * @description Driver model
 * 251216 v1.0.0 김위민 init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Driver'; // 모델명 (JS 내부에서 사용)

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '기사 번호',
  },
  driverName: {
    field: 'driver_name',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '기사 이름'
  },
  phone: {
    field: 'phone',
    type: DataTypes.STRING(25),
    unique: true,
    allowNull: false,
    comment: '기사 연락처',
  },
  accountId: {
    field: 'account_id',
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    comment: '기사 로그인 아이디'
  },
  passwordHash: {
    field: 'password_hash',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '기사 로그인 패스워드',
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: true,
    comment: '기사 이메일',
  },
  carNumber: {
    field: 'car_number',
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: '기사 차량번호',
  },
  notes: {
    field: 'notes',
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '기사 특이사항',
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프래시 토큰',
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
  tableName: 'drivers', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt를 자동 관리
  paranoid: true, // soft delete 설정 (deletedAt 자동 관리)
}

const Driver = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    // JSON으로 serialize 시, 제외할 컬럼을 지정
    define.prototype.toJSON = function() {
      // 내가(difine) 가지고 있는 컬럼 프로파티를 전부 가져오는 처리
      const attributes = this.get();
      // 제외할 컬럼 지정
      delete attributes.passwordHash;
      delete attributes.refreshToken;

      return attributes;
    }

    return define;
  },
  associate: (db) => {
    db.Driver.hasMany(db.DriverAssignment, { sourceKey: 'id', foreignKey: 'driverId', as: 'driverIdDriverAssignments' });
    db.Driver.hasMany(db.DriverAttendanceLog, { sourceKey: 'id', foreignKey: 'driverId', as: 'driverIdDriverAttendanceLogs' });
    db.Driver.hasMany(db.DriverEditProfileLog, { sourceKey: 'id', foreignKey: 'driverId', as: 'driverIdDriverEditProfileLogs' });
    db.Driver.hasMany(db.DriverLocation, { sourceKey: 'id', foreignKey: 'driverId', as: 'driverIdDriverLocation' });
    db.Driver.hasMany(db.DriverLocationLogs, { sourceKey: 'id', foreignKey: 'driverId', as: 'driverIdDriverLocationLogs' });
  }
}

export default Driver;