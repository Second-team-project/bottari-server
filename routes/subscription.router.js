/**
 * @file routes/subscription.router.js
 * @description 푸시 구독 관련 라우터
 * 250104 v1.0.0 N init
 */

import express from 'express';
// ===== middleware
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
// ===== validators
// ===== controllers
import subscriptionController from '../app/controllers/subscription.controller.js';

const subscriptionRouter = express.Router();

subscriptionRouter.post('/', authMiddleware, subscriptionController.subscribe);

export default subscriptionRouter;