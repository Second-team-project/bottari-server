/**
 * @file routes/admin/admin.auth.router.js
 * @description 관리자 인증 관련 라우터
 * 251218 v1.0.0 김민현 init
 */
import express from 'express';
import { adminAuthController } from '../../app/controllers/admins/admin.auth.controller.js';
import loginValidator from '../../app/middlewares/validations/validators/auth/admin.login.validator.js';
import validationHandler from '../../app/middlewares/validation.handler.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';

const adminAuthRouter = express.Router();

adminAuthRouter.post('/login', loginValidator, validationHandler, adminAuthController.login);
adminAuthRouter.post('/logout', authMiddleware, adminAuthController.logout);
adminAuthRouter.post('/reissue', adminAuthController.reissue);

export default adminAuthRouter;