/**
 * @file app/models/Reservation.js
 * @description Reservation model
 * 251216 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Reservation'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '예약 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '유저 번호 (users)',
  },
  code: {
    field: 'code',
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
    comment: '예약 코드',
  },
  state: {
    field: 'state',
    type: DataTypes.STRING(15),
    allowNull: false,
    defaultValue: 'RESERVED',
    comment: '예약 상태: 예약중=RESERVED / 진행중=IN_PROGRESS / 완료=COMPLETED / 취소=CANCELLED',
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
  tableName: 'reservations', // 실제 DB 테이블명
  timestamps: true,   // createdAt, updatedAt를 자동 관리
  paranoid: true,     // soft delete 설정 (deletedAt 자동 관리)
}

// 모델 정의
const Reservation = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },

  // 관계
  associate: (db) => {
    db.Reservation.hasMany(db.Guest, { sourceKey: 'id', foreignKey: 'reserv_id', as: 'reservIdGuests' });
    db.Reservation.hasMany(db.Review, { sourceKey: 'id', foreignKey: 'reserv_id', as: 'reservIdReviews' });
    db.Reservation.hasMany(db.Storage, { sourceKey: 'id', foreignKey: 'reserv_id', as: 'reservIdStorages' });
    db.Reservation.hasMany(db.Delivery, { sourceKey: 'id', foreignKey: 'reserv_id', as: 'reservIdDeliveries' });
    db.Reservation.hasMany(db.Luggage, { sourceKey: 'id', foreignKey: 'reserv_id', as: 'reservIdLuggages' });
    db.Reservation.hasMany(db.DriverAssignment, { sourceKey: 'id', foreignKey: 'reserv_id', as: 'reservIdDriverAssignments' });
    db.Reservation.belongsTo(db.User, { targetKey: 'id', foreignKey: 'user_id', as: 'reservationUser' });
  }
}

export default Reservation;