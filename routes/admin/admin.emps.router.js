/**
 * @file routes/admin/admin.emps.router.js
 * @description 직원 관리 관련 라우터
 * 250101 v1.0.0 김민현 init
 */
import express from 'express';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
import adminEmpsController from '../../app/controllers/admins/admin.emps.controller.js';

const adminEmpsRouter = express.Router();

adminEmpsRouter.use(authMiddleware);

adminEmpsRouter.get('/', , validationHandler, adminEmpsController.index);
adminEmpsRouter.get('/:id', , validationHandler, adminEmpsController.show);
adminEmpsRouter.post('/', , validationHandler, adminEmpsController.store);
adminEmpsRouter.put('/:id', , validationHandler, adminEmpsController.update);
adminEmpsRouter.delete('/:id', , validationHandler, adminEmpsController.destroy);

export default adminEmpsRouter;