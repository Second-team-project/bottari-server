/**
 * @file app/middlewares/validations/fields/guideImg.field.js
 * @description 가이드 이미지 유효성 검사 필드
 * 260107 N init
 */
import { body, param } from "express-validator";

// 이미지 PK 필드
const id = param('id')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

// 제목
const title = body('title')
  .trim()
  .optional({ nullable: true, checkFalsy: true });

// 타입 (배너=BANNER / 서비스안내=SERVICE / 요금안내=PRICE / 사용안내=USAGE / 이벤트=EVENT)
const type = body('type')
  .trim()
  .notEmpty()
  .withMessage('타입은 필수 항목입니다.')
  .bail()
  .isIn(['BANNER', 'SERVICE', 'PRICE', 'USAGE', 'EVENT'])
  .withMessage('허용되지 않은 타입입니다.');

// 활성화 여부 (T / F)
const active = body('active')
  .trim()
  .optional()
  .isIn(['T', 'F'])
  .withMessage('T 또는 F만 허용합니다.');

// 정렬 순서
const sortOrder = body('sortOrder')
  .trim()
  .optional()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

// 연결 링크
const link = body('link')
  .trim()
  .optional({ nullable: true, checkFalsy: true });

export default {
  id,
  title,
  type,
  active,
  sortOrder,
  link,
}
