/**
 * @file routes/user/auth.router.js
 * @description 인증 관련 라우터
 * 251217 v1.0.0 N init
 */

import express from 'express';
// ===== controllers
import authController from '../../app/controllers/user/auth.controller.js'
// ===== validators
import socialValidator from '../../app/middlewares/validations/validators/auth/user.social.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';

const userAuthRouter = express.Router();

userAuthRouter.get('/social/:provider', socialValidator, validationHandler, authController.social);
userAuthRouter.get('/callback/:provider', socialValidator, validationHandler, authController.socialCallback);
userAuthRouter.post('/reissue', authController.reissue);
userAuthRouter.post('/logout', authMiddleware, authController.logout);

export default userAuthRouter;