/**
 * @file routes/pricing.router.js
 * @description 요금 관련 라우터
 * 251224 v1.0.0 N init
 */

import express from 'express';
// ===== validators
// ===== controllers
import pricingController from '../app/controllers/pricing.controller.js';

const pricingRouter = express.Router();

pricingRouter.get('/', pricingController.show);

export default pricingRouter;