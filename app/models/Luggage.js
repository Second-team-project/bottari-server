/**
 * @file app/models/Luggage.js
 * @description Luggage model
 * 251216 v1.0.0 N init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Luggage'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '짐 PK',
  },
  reservId: {
    field: 'reserv_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '예약 번호 (reservations)',
  },
  serviceType: {
    field: 'service_type',
    type: DataTypes.CHAR(1),
    allowNull: false,
    comment: '서비스 타입 : 배송=D / 보관=S',    
  },
  itemType: {
    field: 'item_type',
    type: DataTypes.STRING(30),
    allowNull: false,
    comment: '짐 타입 : CARRIER, BAG, BOX, GOLF',    
  },
  itemWeight: {
    field: 'item_weight',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '짐 무게 : UNDER_10, UNDER_20, UNDER_30, OVER_30',    
  },
  itemSize: {
    field: 'item_size',
    type: DataTypes.STRING(5),
    allowNull: false,
    comment: '짐 크기 : CARRIER:21,24,32,OVER / BAG,BOX: S,M,L,XL / GOLF=null',    
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
  tableName: 'luggages', // 실제 DB 테이블명
  timestamps: true,   // createdAt, updatedAt를 자동 관리
  paranoid: true,     // soft delete 설정 (deletedAt 자동 관리)
}

// 모델 정의
const Luggage = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  // 관계
  associate: (db) => {
    db.Luggage.belongsTo(db.Reservation, { targetKey: 'id', foreignKey: 'reserv_id', as: 'luggageReservation' });
  }
}

export default Luggage;