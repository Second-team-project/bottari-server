/**
 * @file routes/admin/admin.users.router.js
 * @description 유저 관련 라우터
 * 260108 v1.0.0 N init
 */

import express from 'express';
// ===== middlewares
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
// === validators
import { paginationValidator, showValidator, updateValidator, destroyValidator } from '../../app/middlewares/validations/validators/user/admin.user.validator.js'
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import adminUsersController from '../../app/controllers/admins/admin.users.controller.js';

const adminUsersRouter = express.Router();

adminUsersRouter.get('/', authMiddleware, paginationValidator, validationHandler, adminUsersController.index);
adminUsersRouter.get('/:id', authMiddleware,showValidator, validationHandler,  adminUsersController.show);
adminUsersRouter.put('/:id', authMiddleware,updateValidator, validationHandler,  adminUsersController.update);
adminUsersRouter.delete('/:id', authMiddleware,destroyValidator, validationHandler,  adminUsersController.destroy);

export default adminUsersRouter;