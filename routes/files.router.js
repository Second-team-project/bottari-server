/**
 * @file app/routes/files.router.js
 * @description 파일 업로더 인증 관련 라우터
 * 251230 v1.0.0 김민현 init
 */
import express from 'express';
import multerMiddleware from '../app/middlewares/multer/multer.middleware.js';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
import adminFilesController from '../app/controllers/admins/admin.files.controller.js';

const filesRouter = express.Router();

filesRouter.post('/notices', authMiddleware, multerMiddleware.noticeUploader, adminFilesController.uploadNoticeImage);

export default filesRouter;