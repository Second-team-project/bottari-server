/**
 * @file routes/admins/admin.additionalPricing.router.js
 * @description 추가 요금 관련 라우터
 * 260106 v1.0.0 N init
 */

import express from 'express';
// ===== validators
import { storeValidator, updateValidator, destroyValidator } from '../../app/middlewares/validations/validators/additionalPricing/additionalPricing.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import additionalPricingController from '../../app/controllers/admins/admin.additionalPricing.controller.js';

const adminAdditionalPricingRouter = express.Router();

adminAdditionalPricingRouter.get('/', additionalPricingController.index);
adminAdditionalPricingRouter.post('/', storeValidator, validationHandler, additionalPricingController.store);
adminAdditionalPricingRouter.put('/:id', updateValidator, validationHandler, additionalPricingController.update);
adminAdditionalPricingRouter.delete('/:id', destroyValidator, validationHandler, additionalPricingController.destroy);

export default adminAdditionalPricingRouter;