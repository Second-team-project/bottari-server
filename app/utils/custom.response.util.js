/**
 * @file app/utils/customResponse.util.js
 * @description 공통 응답 형식을 생성하는 유틸리티 
 * 251213 v1.0.0 N init
 */

/**
 * 기본 응답 객체 생성
 * @param {import('../../configs/responseCode.config.js').ResponseCodeConfig} codeInfo - 응답 코드 설정 객체
 * @param {null|[]|{}} data 
 * @returns {import('./custom.response.util.type.js').customResponse} 최종 응답 객체
 */
export default function customResponse(codeInfo, data = null) {
  const responseData = {
    code: codeInfo.code,
    msg: codeInfo.info,
  }

  if(data) {
    responseData.data = data;
  }

  return responseData;
}