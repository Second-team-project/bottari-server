/**
 * @file app/models/User.js
 * @description user model
 * 251216 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'User'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '유저 PK',
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
  provider: {
    field: 'provider',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '로그인 제공자 : KAKAO, GOOGLE'
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프레시 토큰',
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
  tableName: 'users', // 실제 DB 테이블명
  timestamps: true,   // createdAt, updatedAt를 자동 관리
  paranoid: true,     // soft delete 설정 (deletedAt 자동 관리)
}

// 모델 정의
const User = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    // JSON으로 serialize 시, 제외할 컬럼을 지정
    define.prototype.toJSON = function() {
      //                  ↱ define
      const attributes = this.get();
      delete attributes.refreshToken;

      return attributes;
    }

    return define;
  },
  // 관계
  associate: (db) => {
    db.User.hasMany(db.Reservation, { sourceKey: 'id', foreignKey: 'user_id', as: 'userIdReservations' });
    db.User.hasMany(db.Review, { sourceKey: 'id', foreignKey: 'user_id', as: 'userIdReviews' });
    db.User.hasMany(db.Push, { sourceKey: 'id', foreignKey: 'user_id', as: 'userIdPushes' });
  }
}

export default User;