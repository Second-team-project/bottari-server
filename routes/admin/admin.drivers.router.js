/**
 * @file routes/admin/admin.drivers.router.js
 * @description 기사 관리 관련 라우터
 * 251231 v1.0.0 김민현 init
 */
import express from 'express';
import adminDriversController from '../../app/controllers/admins/admin.drivers.controller.js';

const adminDriversRouter = express.Router();

adminDriversRouter.get('/', adminDriversController.index);
adminDriversRouter.get('/:id',adminDriversController.show);
adminDriversRouter.post('/', adminDriversController.store);
adminDriversRouter.put('/:id', adminDriversController.update);
adminDriversRouter.delete('/:id',adminDriversController.destroy);

export default adminDriversRouter;