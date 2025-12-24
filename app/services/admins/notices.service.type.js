/**
 * @file app/services/notices.service.type.js
 * @description notices Service Types
 * 251222 김민현 init
 */

/**
 * 페이지 타입
 * @typedef {number} Page
 */

/**
 * 공지사항 게시글 ID 타입
 * @typedef {number} Id
 */

/**
 * 공지사항 게시글 작성 타입
 * @typedef {object} NoticeStoreData
 * @property {number} adminId
 * @property {string} content
 * @property {string} image
 */

/**
 * 공지사항 게시글 삭제 타입
 * @typedef {object} NoticeDestroyData
 * @property {number} adminId
 * @property {number} noticeId
 */

export default {}