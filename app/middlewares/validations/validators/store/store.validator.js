/**
 * @file app/middlewares/validations/validators/store/store.validator.js
 * @description 보관소용 유효성 체크
 * 260107 v1.0.0 N init
 */

import storeField from "../../fields/store.field.js";

/**
 * 데이터 생성용 검증
 */
export const storeValidator = [ 
  storeField.code,  
  storeField.storeName,  
  storeField.addr,  
  storeField.tel, 
];

/**
 * 데이터 수정용 검증
 */
export const updateValidator = [ 
  storeField.id,  
  storeField.storeName,  
  storeField.addr,  
  storeField.tel, 
];

/**
 * 데이터 삭제용 검증
 */
export const destroyValidator = [ 
  storeField.id,  
];