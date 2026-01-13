/**
 * @file routes/admin/admin.drivers.router.js
 * @description 기사 관리 관련 라우터
 * 251231 v1.0.0 김민현 init
 */
import express from 'express';
import adminDriversController from '../../app/controllers/admins/admin.drivers.controller.js';
import indexValidator from '../../app/middlewares/validations/validators/drivers/index.validator.js';
import showValidator from '../../app/middlewares/validations/validators/drivers/show.validator.js';
import storeValidator from '../../app/middlewares/validations/validators/drivers/store.validator.js';
import updateValidator from '../../app/middlewares/validations/validators/drivers/update.validator.js';
import destroyValidator from '../../app/middlewares/validations/validators/drivers/destroy.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';

const adminDriversRouter = express.Router();

adminDriversRouter.use(authMiddleware);

adminDriversRouter.get('/', indexValidator, validationHandler, adminDriversController.index);
adminDriversRouter.get('/:id', showValidator, validationHandler, adminDriversController.show);
adminDriversRouter.post('/', storeValidator, validationHandler, adminDriversController.store);
adminDriversRouter.put('/:id', updateValidator, validationHandler, adminDriversController.update);
adminDriversRouter.delete('/:id', destroyValidator, validationHandler, adminDriversController.destroy);

export default adminDriversRouter;