/**
 * @file routes/admin/admin.FAQ.router.js
 * @description FAQ 라우터
 * 251222 v1.0.0 김민현 init
 */
import express from 'express';
import validationHandler from '../../app/middlewares/validation.handler.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
import adminFAQController from '../../app/controllers/admins/admin.FAQ.controller.js';

const adminFAQRouter = express.Router();

// TODO : authMiddleware 추가
adminFAQRouter.get('/', adminFAQController.index);
adminFAQRouter.get('/:id', adminFAQController.show);
adminFAQRouter.post('/', adminFAQController.store);
adminFAQRouter.delete('/:id', adminFAQController.destroy);

export default adminFAQRouter;