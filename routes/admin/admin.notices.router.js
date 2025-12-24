/**
 * @file routes/admin/admin.notices.router.js
 * @description 관리자 공지사항 관련 라우터
 * 251219 v1.0.0 김민현 init
 */
import express from 'express';
import adminNoticesController from '../../app/controllers/admins/admin.notices.controller.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
import indexValidator from '../../app/middlewares/validations/validators/notices/index.validator.js';
import showValidator from '../../app/middlewares/validations/validators/notices/show.validator.js';
import storeValidator from '../../app/middlewares/validations/validators/notices/store.validator.js';
import deleteValidator from '../../app/middlewares/validations/validators/notices/destroy.validator.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';

const adminNoticesRouter = express.Router();

adminNoticesRouter.get('/', indexValidator, validationHandler, adminNoticesController.index);
adminNoticesRouter.get('/:id', authMiddleware, showValidator, validationHandler, adminNoticesController.show);
adminNoticesRouter.post('/', authMiddleware, storeValidator, validationHandler, adminNoticesController.store);
adminNoticesRouter.delete('/:id', authMiddleware, deleteValidator, validationHandler, adminNoticesController.destroy);

export default adminNoticesRouter;