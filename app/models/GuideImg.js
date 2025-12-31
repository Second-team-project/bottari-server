/**
 * @file app/models/GuideImg.js
 * @description GuideImg model
 * 251216 v1.0.0 김민현 init
 */
import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'GuideImg'; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '공지사항 PK'
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '배너=BANNER / 요금안내=PRICE / 사용안내=USE / 팝업=POPUP'
  },
  img: {
    field: 'img',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '이미지',
  },
  imgEng: {
    field: 'img_eng',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '이미지eng',
  },
  active: {
    field: 'active',
    type: DataTypes.CHAR(1),
    allowNull: false,
    defaultValue: 'T',
    comment: '활성화=T / 비활성화=F'
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
  tableName: 'guide_img',
  timestamps: true,
  paranoid: true
}

// 모델 정의
const GuideImg = {
  // 초기화
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  }
}

export default GuideImg;