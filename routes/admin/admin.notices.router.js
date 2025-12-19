/**
 * @file routes/admin/admin.notices.router.js
 * @description 관리자 공지사항 관련 라우터
 * 251219 v1.0.0 김민현 init
 */
import express from 'express';

const adminNoticesRouter = express.Router();

adminNoticesRouter.get('/', validationHandler);