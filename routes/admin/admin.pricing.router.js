/**
 * @file routes/pricing.router.js
 * @description 요금 관련 라우터
 * 251224 v1.0.0 N init
 */

import express from 'express';
// ===== middelwares
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
// === validators
import { storeValidator, updateValidator, destroyValidator } from '../../app/middlewares/validations/validators/pricing/admin.pricing.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import adminPricingController from '../../app/controllers/admins/admin.pricing.controller.js';

const adminPricingRouter = express.Router();

adminPricingRouter.get('/', authMiddleware, adminPricingController.index);
adminPricingRouter.post('/', authMiddleware, storeValidator, validationHandler, adminPricingController.store);
adminPricingRouter.put('/:id', authMiddleware, updateValidator, validationHandler, adminPricingController.update);
adminPricingRouter.delete('/:id', authMiddleware, destroyValidator, validationHandler, adminPricingController.destroy);

export default adminPricingRouter;