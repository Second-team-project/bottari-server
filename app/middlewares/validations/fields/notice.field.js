/**
 * @file app/middlewares/validations/fields/notice.field.js
 * @description 공지사항 게시글 유효성 검사 필드
 * 251222 v1.0.0 김민현 init
 */
import { body, param, query } from "express-validator";
import fs from 'fs';
import path from "path";

// 페이지 필드
const page = query('page')
  .trim()
  .optional()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

// 게시글 PK 필드
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
  .notEmpty()
  .withMessage('내용은 필수 항목입니다.');

// 게시글 내용
const content = body('content')
  .trim()
  .notEmpty()
  .withMessage('내용은 필수 항목입니다.');

// // 게시글 이미지
// export const image = body('image')
//   .trim()
//   .bail()
//   .custom(val => {
//     // 우리 앱의 게시글 이미지에 접근하는 `도메인 + path`가 맞는지 확인
//     if(!val.startsWith(`${process.env.APP_URL}${process.env.ACCESS_FILE_POST_IMAGE_PATH}`)) {
//       return false;
//     }

//     return true;
//   })
//   .withMessage('허용하지 않는 이미지 경로입니다.')
//   .bail()
//   // 실제 이미지 파일이 있는지 검증
//   .custom(val => {
//     const splitPath = val.split('/');
//     const fullPath = path.join(pathUtil.getPostsImagePath(), splitPath[splitPath.length - 1]);
//     if(!fs.existsSync(fullPath)) {
//       return false;
//     }

//     return true;
//   })
//   .withMessage('존재하지 않는 이미지 경로입니다.');

export default {
  page,
  id,
  content,
}