/**
 * @file app/models/ChatMessage.js
 * @description ChatMessage model
 * 260107 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'ChatMessage';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '메시지 PK',
  },
  roomId: {
    field: 'room_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '채팅방 ID (chat_rooms)',
  },
  senderType: {
    field: 'sender_type',
    type: DataTypes.ENUM('USER', 'ADMIN'),
    allowNull: false,
    comment: '발신자 타입: USER(유저) / ADMIN(관리자)',
  },
  adminId: {
    field: 'admin_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '관리자 ID (admins) - 관리자 발신일 때만',
  },
  content: {
    field: 'content',
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '메시지 내용 또는 이미지 URL',
  },
  messageType: {
    field: 'message_type',
    type: DataTypes.ENUM('TEXT', 'IMAGE'),
    allowNull: false,
    defaultValue: 'TEXT',
    comment: '메시지 타입: TEXT(텍스트) / IMAGE(이미지)',
  },
  isRead: {
    field: 'is_read',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '읽음 여부',
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
  tableName: 'chat_messages',
  timestamps: true,
  paranoid: true,
}

// 모델 정의
const ChatMessage = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },

  // 관계
  associate: (db) => {
    db.ChatMessage.belongsTo(db.ChatRoom, { targetKey: 'id', foreignKey: 'roomId', as: 'messageRoom' });
    db.ChatMessage.belongsTo(db.Admin, { targetKey: 'id', foreignKey: 'adminId', as: 'messageAdmin' });
  }
}

export default ChatMessage;
