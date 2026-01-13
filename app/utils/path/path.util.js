/**
 * @file app/utils/path/path.util.js
 * @description path 유틸리티
 * 251230 v1.0.0 김민현 init
 */
import path from 'path';

// 공지사항 이미지 저장 경로
function getNoticesImagePath() {
  // 개발 모드(dev)가 아니면 환경변수 그대로 사용, 개발 모드면 '절대 경로'로 변환
  return process.env.APP_MODE !== 'dev'
    ? process.env.FILE_NOTICE_IMAGE_PATH
    : path.resolve(process.env.FILE_NOTICE_IMAGE_PATH);
}

// FAQ 이미지 저장 경로
function getFAQImagePath() {
  // 개발 모드(dev)가 아니면 환경변수 그대로 사용, 개발 모드면 '절대 경로'로 변환
  return process.env.APP_MODE !== 'dev'
    ? process.env.FILE_FAQ_IMAGE_PATH
    : path.resolve(process.env.FILE_FAQ_IMAGE_PATH);
}

export default {
  getNoticesImagePath,
  getFAQImagePath,
}