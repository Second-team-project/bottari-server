/**
 * @file routes/admins/admin.additionalPricing.router.js
 * @description 추가 요금 관련 라우터
 * 260106 v1.0.0 N init
 */

import express from 'express';
// ===== validators
// ===== controllers
import additionalPricingController from '../../app/controllers/admins/admin.additionalPricing.controller.js';

const adminAdditionalPricingRouter = express.Router();

adminAdditionalPricingRouter.get('/', additionalPricingController.index);
adminAdditionalPricingRouter.post('/', additionalPricingController.store);
adminAdditionalPricingRouter.put('/:id', additionalPricingController.update);
adminAdditionalPricingRouter.delete('/:id', additionalPricingController.destroy);

export default adminAdditionalPricingRouter;