/**
 * @file routes/admin/admin.store.router.js
 * @description 보관소 관련 라우터
 * 251228 v1.0.0 N init
 */

import express from 'express';
// ===== middlewares
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
// === validators
import { storeValidator, updateValidator, destroyValidator } from '../../app/middlewares/validations/validators/store/store.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import adminStoreController from '../../app/controllers/admins/admin.store.controller.js';

const adminStoreRouter = express.Router();

adminStoreRouter.get('/', authMiddleware, adminStoreController.index);
adminStoreRouter.post('/', authMiddleware, storeValidator, validationHandler, adminStoreController.store);
adminStoreRouter.put('/:id', authMiddleware, updateValidator, validationHandler, adminStoreController.update);
adminStoreRouter.delete('/:id', authMiddleware, destroyValidator, validationHandler, adminStoreController.destroy);

export default adminStoreRouter;