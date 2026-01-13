/**
 * @file app/middlewares/validations/validators/guideImg/guideImg.validator.js
 * @description 가이드 이미지용 유효성 체크
 * 260107 v1.0.0 N init
 */

import guideImgField from "../../fields/guideImg.field.js";

/**
 * 데이터 생성용 검증
 */
export const storeValidator = [ 
  guideImgField.title,
  guideImgField.type,
  guideImgField.active,
  guideImgField.sortOrder,
  guideImgField.link,
];

/**
 * 데이터 수정용 검증
 */
export const updateValidator = [ 
  guideImgField.id,
  guideImgField.title,
  guideImgField.type,
  guideImgField.active,
  guideImgField.sortOrder,
  guideImgField.link,
];

/**
 * 데이터 수정용 검증
 */
export const updateOrderValidator = [ 
  guideImgField.id,
  guideImgField.sortOrder,
];

/**
 * 데이터 삭제용 검증
 */
export const destroyValidator = [ 
  guideImgField.id, 
];