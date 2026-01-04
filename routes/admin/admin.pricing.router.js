/**
 * @file routes/pricing.router.js
 * @description 요금 관련 라우터
 * 251224 v1.0.0 N init
 */

import express from 'express';
// ===== validators
// ===== controllers
import pricingController from '../../app/controllers/admins/admin.pricing.controller.js';

const adminPricingRouter = express.Router();

adminPricingRouter.get('/', pricingController.index);
adminPricingRouter.get('/additional', pricingController.indexAdditional);

export default adminPricingRouter;