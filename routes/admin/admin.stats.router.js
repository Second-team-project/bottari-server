/**
 * @file routes/admin/admin.stats.router.js
 * @description 통계 관련 라우터
 * 251230 v1.0.0 김민현 init
 */
import express from 'express';
import adminStatsController from '../../app/controllers/admins/admin.stats.controller.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';

const adminStatsRouter = express.Router();

adminStatsRouter.get('/', authMiddleware, adminStatsController.getMonthlyStats);

export default adminStatsRouter;