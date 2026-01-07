/**
 * @file app/models/ChatRoom.js
 * @description ChatRoom model
 * 260107 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'ChatRoom';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '채팅방 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '회원 유저 ID (users)',
  },
  bookerId: {
    field: 'booker_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '비회원 예약자 ID (bookers)',
  },
  isBlocked: {
    field: 'is_blocked',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '차단 여부',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const val = this.getDataValue('createdAt');
      if (!val) {
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
      if (!val) {
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
      if (!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

// 옵션 정의
const options = {
  tableName: 'chat_rooms',
  timestamps: true,
  paranoid: true,
}

// 모델 정의
const ChatRoom = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },

  // 관계
  associate: (db) => {
    db.ChatRoom.belongsTo(db.User, { targetKey: 'id', foreignKey: 'userId', as: 'chatRoomUser' });
    db.ChatRoom.belongsTo(db.Booker, { targetKey: 'id', foreignKey: 'bookerId', as: 'chatRoomBooker' });
    db.ChatRoom.hasMany(db.ChatMessage, { sourceKey: 'id', foreignKey: 'roomId', as: 'chatRoomMessages' });
  }
}

export default ChatRoom;
