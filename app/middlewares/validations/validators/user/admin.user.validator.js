/**
 * @file app/middlewares/validations/validators/user/user.validator.js
 * @description 유저 관리용 유효성 체크
 * 260109 v1.0.0 N init
 */

import userField from "../../fields/user.field.js";

/**
 * 데이터 전체 조회용 검증
 */
export const paginationValidator = [ 
  userField.page,
  userField.keyword,
  userField.searchType,
];

/**
 * 데이터 특정 조회용 검증
 */
export const showValidator = [ 
  userField.id,
];

/**
 * 데이터 수정용 검증
 */
export const updateValidator = [ 
  userField.id,  
  userField.status,
  userField.adminMemo
];

/**
 * 데이터 삭제용 검증
 */
export const destroyValidator = [ 
  userField.id,  
];