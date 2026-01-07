/**
 * @file routes/pricing.router.js
 * @description 요금 관련 라우터
 * 251224 v1.0.0 N init
 */

import express from 'express';
// ===== validators
import { storeValidator, updateValidator, destroyValidator } from '../../app/middlewares/validations/validators/pricing/admin.pricing.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import pricingController from '../../app/controllers/admins/admin.pricing.controller.js';

const adminPricingRouter = express.Router();

adminPricingRouter.get('/', pricingController.index);
adminPricingRouter.post('/', storeValidator, validationHandler, pricingController.store);
adminPricingRouter.put('/:id', updateValidator, validationHandler, pricingController.update);
adminPricingRouter.delete('/:id', destroyValidator, validationHandler, pricingController.destroy);

export default adminPricingRouter;