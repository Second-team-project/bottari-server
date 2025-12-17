/**
 * @file routes/auth.router.js
 * @description 인증 관련 라우터
 * 251217 v1.0.0 김민현 init
 */
import express from 'express';
import { adminAuthController } from '../app/controllers/admin.auth.controller.js';

const authRouter = express.Router();

// 관리자 인증
authRouter.post('/login', adminAuthController.login);
authRouter.post('/logout', adminAuthController.logout);
authRouter.post('/reissue', adminAuthController.reissue);

export default authRouter;