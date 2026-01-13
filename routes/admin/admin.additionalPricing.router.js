/**
 * @file routes/admins/admin.additionalPricing.router.js
 * @description 추가 요금 관련 라우터
 * 260106 v1.0.0 N init
 */

import express from 'express';
// ===== middlewares
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
// === validators
import { storeValidator, updateValidator, destroyValidator } from '../../app/middlewares/validations/validators/additionalPricing/additionalPricing.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import adminAdditionalPricingController from '../../app/controllers/admins/admin.additionalPricing.controller.js';

const adminAdditionalPricingRouter = express.Router();

adminAdditionalPricingRouter.get('/', authMiddleware, adminAdditionalPricingController.index);
adminAdditionalPricingRouter.post('/', authMiddleware, storeValidator, validationHandler, adminAdditionalPricingController.store);
adminAdditionalPricingRouter.put('/:id', authMiddleware, updateValidator, validationHandler, adminAdditionalPricingController.update);
adminAdditionalPricingRouter.delete('/:id', authMiddleware, destroyValidator, validationHandler, adminAdditionalPricingController.destroy);

export default adminAdditionalPricingRouter;