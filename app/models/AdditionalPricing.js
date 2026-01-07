/**
 * @file app/models/Pricing.js
 * @description Pricing model
 * 251216 v1.0.0 김민현 init
 */
import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'AdditionalPricing'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '요금 PK'
  },
  serviceType: {
    field: 'service_type',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '배송=D, 보관=S'
  },
  minValue: {
    field: 'min_value',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '최소 거리/시간'
  },
  maxValue: {
    field: 'max_value',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '최대 거리/시간'
  },
  rate: {
    field: 'rate',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '추가 비용(%)'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '작성일',
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
    comment: '수정일',
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
    comment: '삭제일',
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}

// 옵션 정의
const options = {
  tableName: 'additional_pricing',
  timestamps: true,
  paranoid: true
}

// 모델 정의
const AdditionalPricing = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  }
}

export default AdditionalPricing;