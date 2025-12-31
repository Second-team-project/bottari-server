/**
 * @file app/middlewares/validations/fields/luggage.field.js
 * @description 짐 정보(luggageInfo) 유효성 검사 필드 (Pricing 테이블 기반)
 * 251223 v1.0.0 N init
 */

import { body } from 'express-validator';
import db from '../../../models/index.js';
import { SERVICE_CODE } from '../../../../configs/service.type.enum.js';

const luggageList = body('luggageList')
  .isArray({ min: 1 })
  .withMessage('짐 목록 형식이 올바르지 않습니다.')
  .custom(async (list, { req }) => {
    
    // 3-1. 서비스 타입 코드 변환 (DELIVERY -> D, STORAGE -> S)
    const serviceTypeCode = SERVICE_CODE[req.body.type];

    // 2. 루프를 돌며 각 항목 검증
    for (const info of list) {
      // 1. 기본 형식 체크 : 클라이언트에서 객체로 받음
      if (!info || typeof info !== 'object') {
        throw new Error('짐 정보가 올바르지 않습니다.');
      }

      // 2. 필수값 체크 : itemType&itemWeight는 필수, itemSize는 옵션(GOLF)
      if (!info.itemType || !info.itemWeight) {
         throw new Error('짐 종류와 무게 정보가 누락되었습니다.');
      }
  
      // 3-2. DB 조회: Pricing 테이블에 유효한 옵션인지 확인
      const pricing = await db.Pricing.findOne({
        where: {
          itemType: info.itemType,
          // itemSize가 undefined나 빈 문자열이면 null로 처리하여 조회
          itemSize: info.itemSize || null, 
          itemWeight: info.itemWeight,
          serviceType: serviceTypeCode
        }
      });
  
      if (!pricing) {
        throw new Error(`지원하지 않는 짐 규격이 포함되어 있습니다: ${info.itemType}`);
      }
    }

    return true;
  });

// ------------------------------------------
// 예약 관리용
// ------------------------------------------
const items = body('items')
  .isArray({ min: 1 })
  .withMessage('짐 정보는 리스트 형태이며, 최소 1개 이상이어야 합니다.')
;

// 짐 내부 객체 검증 (* = 한번에 검사)
const itemType = body('items.*.type')
  .trim()
  .notEmpty()
  .withMessage('짐 종류(type)는 필수입니다.')
;

const itemSize = body('items.*.size')
  .trim()
  .notEmpty()
  .withMessage('짐 크기(size)는 필수입니다.')
;

const itemWeight = body('items.*.weight')
  .optional()
  .isString()
;

const itemCount = body('items.*.count')
  .optional()
  .isInt({ min: 1 })
  .withMessage('수량은 1개 이상이어야 합니다.')
;

export default {
  luggageList,
  // 예약 관리용
  items,
  itemType,
  itemSize,
  itemWeight,
  itemCount,
};
