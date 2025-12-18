/**
 * @file routes/auth.router.js
 * @description 인증 관련 라우터
 * 251217 v1.0.0 N init
 */

import express from 'express';

import authController from '../../app/controllers/user/auth.controller.js'

const userAuthRouter = express.Router();

userAuthRouter.post('/reissue', authController.reissue);
userAuthRouter.get('/social/:provider', authController.social);
userAuthRouter.get('/callback/:provider', authController.socialCallback);

export default userAuthRouter;