/**
 * @file app/models/Delivery.js
 * @description Delivery model
 * 251216 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Delivery'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '배송 PK',
  },
  reservId: {
    field: 'reserv_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '예약 번호 (reservations)',
  },
  price: {
    field: 'price',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '결제 금액',
  },
  startedAt: {
    field: 'started_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '픽업 일시',
  },
  startedAddr: {
    field: 'started_addr',
    type: DataTypes.STRING(225),
    allowNull: false,
    comment: '픽업 장소',
  },
  endedAddr: {
    field: 'ended_addr',
    type: DataTypes.STRING(225),
    allowNull: false,
    comment: '도착 장소',
  },
  notes: {
    field: 'notes',
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null,
    comment: '요청 사항',
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
  tableName: 'deliveries', // 실제 DB 테이블명
  timestamps: true,   // createdAt, updatedAt를 자동 관리
  paranoid: true,     // soft delete 설정 (deletedAt 자동 관리)
}

// 모델 정의
const Delivery = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  // 관계
  associate: (db) => {
    db.Delivery.belongsTo(db.Reservation, { targetKey: 'id', foreignKey: 'reserv_id', as: 'deliveryReservation' });
  }
}

export default Delivery;