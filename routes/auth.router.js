/**
 * @file routes/auth.router.js
 * @description 인증 관련 라우터
 * 251217 v1.0.0 N init
 */

import express from 'express';

import authController from '../app/controllers/user/auth.controller.js'

const authRouter = express.Router();

authRouter.post('/reissue', authController.reissue);
authRouter.get('/social/:provider', authController.social);
authRouter.get('/callback/:provider', authController.socialCallback);

export default authRouter;