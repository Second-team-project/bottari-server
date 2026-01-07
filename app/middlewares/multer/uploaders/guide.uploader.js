/**
 * @file app/middlewares/multer/uploaders/guide.uploader.js
 * @description 배너 이미지 업로더
 * 260107 N init
 */

import multer from 'multer';
import fs from 'fs';
import dayjs from 'dayjs';
import crypto from 'crypto';
import path from 'path';

import customError from '../../../errors/custom.error.js';
import { BAD_FILE_ERROR } from '../../../../configs/responseCode.config.js';

/**
 * 게시글 이미지 업로더 처리 미들웨어
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction*} next 
 */
export default function(req, res, next) {
  const upload = multer({
    // 1. storage: "어디에 어떻게 저장할까?" 설정
    storage: multer.diskStorage({
      // 1-1. destination: 저장할 폴더 위치 정하기
      destination(req, file, callback) {
        const uploadPath = path.resolve(process.env.FILE_GUIDE_IMAGE_PATH);
        // 1-1-1. 해당 디렉토리 없으면 생성 처리
        if(!fs.existsSync(uploadPath)) {
          fs.mkdirSync(
            uploadPath,
            {
              recursive: true, // 중간 디렉토리(/var/www/image)까지 모두 생성 
              mode: 0o755,  // 권한 설정 rwxr-xr-x
            }
          )
        }

        callback(null, uploadPath);
      },
      // 1-2. filename: 파일 이름 짓기
      filename(req, file, callback) {
        const type = req.body.type?.toLowerCase() || 'unknown';
        const uniqueFileName = `${type}_${dayjs().format('YYYYMMDD')}_${crypto.randomUUID()}`;
        const fileNameParts = file.originalname.split('.');
        const ext = fileNameParts[fileNameParts.length - 1].toLowerCase();

        callback(null, `${uniqueFileName}.${ext}`);
      }
    }),
    // 2. fileFilter : 파일 필터링 처리를 제어하는 프로퍼티 (validator로 불가능)
    fileFilter(req, file, callback) {
      // 미디어 타입 여부 : mimetype이 'image/'로 시작하는지 검사 (jpg, png 등)
      if(!file.mimetype.startsWith('image/')) {
        return callback(customError('이미지 파일 아님', BAD_FILE_ERROR));
      }

      callback(null, true);
    },
    // 3. limits: 용량 제한
    limits: {
      fileSize: parseInt(process.env.FILE_GUIDE_IMAGE_SIZE),
    },
  }).single('img');

  // upload 실행
  // 예외 처리 필요 : 에러 핸들러에 캐칭되지 않는 것 고려
  upload(req, res, err => {
    if(err instanceof multer.MulterError || err) {
      next(customError(err.message, BAD_FILE_ERROR));
    }

    console.log('--- Multer 통과 ---');
    console.log('파일:', req.file);
    console.log('바디:', req.body);

    next()
  })
}