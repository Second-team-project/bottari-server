/**
 * @file app/models/Push.js
 * @description Push model
 * 251216 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Push'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '푸시 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '유저 번호 (users)',
  },
  endpoint: {
    field: 'endpoint',
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true,
    comment: '엔드포인트',  // push server와 user 연결
  },
  p256dh: {
    field: 'p256dh',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '공개키',
  },
  auth: {
    field: 'auth',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '인증키',
  },
  device: {
    field: 'device',
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: '디바이스',
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
  tableName: 'pushes', // 실제 DB 테이블명
  timestamps: true,   // createdAt, updatedAt를 자동 관리
  paranoid: true,     // soft delete 설정 (deletedAt 자동 관리)
}

// 모델 정의
const Push = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  // 관계
  associate: (db) => {
    db.Push.belongsTo(db.User, { targetKey: 'id', foreignKey: 'user_id', as: 'user' });
  }
}

export default Push;