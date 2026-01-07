/**
 * @file routes/admin/admin.store.router.js
 * @description 보관소 관련 라우터
 * 251228 v1.0.0 N init
 */

import express from 'express';
// ===== validators
import { storeValidator, updateValidator, destroyValidator } from '../../app/middlewares/validations/validators/store/store.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import storeController from '../../app/controllers/admins/admin.store.controller.js';

const storeRouter = express.Router();

storeRouter.get('/', storeController.index);
storeRouter.post('/', storeValidator, validationHandler, storeController.store);
storeRouter.put('/:id', updateValidator, validationHandler, storeController.update);
storeRouter.delete('/:id', destroyValidator, validationHandler, storeController.destroy);

export default storeRouter;