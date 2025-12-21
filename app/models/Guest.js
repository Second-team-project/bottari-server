/**
 * @file app/models/Guest.js
 * @description Guest model
 * 251216 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Guest'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '비회원 PK',
  },
  reservId: {
    field: 'reserv_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '예약 번호 (reservations)',
  },
  userName: {
    field: 'user_name',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '이름',
  },
  phone: {
    field: 'phone',
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true,
    comment: '연락처',
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: '이메일',
  },
  passwordHash: {
    field: 'password_hash',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '조회용 비밀번호',
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프레쉬 토큰',
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
  tableName: 'guests', // 실제 DB 테이블명
  timestamps: true,   // createdAt, updatedAt를 자동 관리
  paranoid: true,     // soft delete 설정 (deletedAt 자동 관리)
}

// 모델 정의
const Guest = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  // 관계
  associate: (db) => {
    db.Guest.belongsTo(db.Reservation, { targetKey: 'id', foreignKey: 'reserv_id', as: 'luggageReservation' });
  }
}

export default Guest;