/**
 * @file app/models/Pricing.js
 * @description Pricing model
 * 251216 v1.0.0 김민현 init
 */
import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Pricing'; // 모델명(JS 내부에서 사용)

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
  itemType: {
    field: 'item_type',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '캐리어=CARRIER / 가방=BAG / 상자=BOX / 골프가방=GOLF'
  },
  itemSize: {
    field: 'item_size',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'CARRIER:21,24,32,OVER / BAG,BOX: S,M,L,XL / GOLF=null'
  },
  itemWeight: {
    field: 'item_weight',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '~10kg, ~20kg, ~30kg, OVER'
  },
  serviceType: {
    field: 'service_type',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '배송=D, 보관=S'
  },
  basePrice: {
    field: 'base_price',
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '기본 가격'
  },
  minValue: {
    field: 'min_value',
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null,
    comment: '최소 거리/시간'
  },
  maxValue: {
    field: 'max_value',
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null,
    comment: '최대 거리/시간'
  },
  addPrice: {
    field: 'add_price',
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null,
    comment: '추가 비용'
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
  tableName: 'pricing',
  timestamps: true,
  paranoid: true
}

// 모델 정의
const Pricing = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  }
}

export default Pricing;