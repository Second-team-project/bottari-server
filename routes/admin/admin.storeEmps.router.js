/**
 * @file routes/admin/admin.storeEmps.router.js
 * @description 직원 관리 관련 라우터
 * 250101 v1.0.0 김민현 init
 */
import express from 'express';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
import adminStoreEmpsController from '../../app/controllers/admins/admin.storeEmps.controller.js';
import indexValidator from '../../app/middlewares/validations/validators/emps/index.validator.js';
import showValidator from '../../app/middlewares/validations/validators/emps/show.validator.js';
import storeValidator from '../../app/middlewares/validations/validators/emps/store.validator.js';
import updateValidator from '../../app/middlewares/validations/validators/emps/update.validator.js';
import destroyValidator from '../../app/middlewares/validations/validators/emps/destroy.validator.js';

const adminStoreEmpsRouter = express.Router();

adminStoreEmpsRouter.use(authMiddleware);

adminStoreEmpsRouter.get('/', indexValidator, validationHandler, adminStoreEmpsController.index);
adminStoreEmpsRouter.get('/:id', showValidator, validationHandler, adminStoreEmpsController.show);
adminStoreEmpsRouter.post('/', storeValidator, validationHandler, adminStoreEmpsController.store);
adminStoreEmpsRouter.put('/:id', updateValidator, validationHandler, adminStoreEmpsController.update);
adminStoreEmpsRouter.delete('/:id', destroyValidator, validationHandler, adminStoreEmpsController.destroy);

export default adminStoreEmpsRouter;