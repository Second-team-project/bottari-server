// app/routes/test.route.js (임시. 에러/응답 정삭 작동 확인용)

import { Router } from 'express';
import { SUCCESS, NOT_FOUND_ERROR, SYSTEM_ERROR } from '../configs/responseCode.config.js';
import customResponse from '../app/utils/custom.response.util.js';
import customError from '../app/errors/custom.error.js';
import db from '../app/models/index.js';

const { sequelize } = db
const router = Router();

// 1. 성공 응답 테스트
router.get('/success', (req, res) => {
  res.send(customResponse(SUCCESS, { message: '잘 되네!' }));
});

// 2. 커스텀 에러 테스트
router.get('/custom-error', (req, res, next) => {
  try {
    throw customError('일부러 에러 냄', NOT_FOUND_ERROR);
  } catch(err) {
    next(err);  // 에러 핸들러로 전달
  }
});

// 3. 시스템 에러 테스트 (codeInfo 없는 에러)
router.get('/system-error', (req, res, next) => {
  try {
    throw new Error('예상 못한 에러!');
  } catch(err) {
    next(err);
  }
});

// 4. DB 연결 테스트
router.get('/db-test', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    res.send(customResponse(SUCCESS, { db: '연결 성공!' }));
  } catch(err) {
    next(err);
  }
});

export default router;