/**
 * @file routes/driver/driver.location.router.js
 * @description 기사 GPS 관련 라우터
 * 250101 v1.0.0 N init
 */

import express from 'express';
// ===== validators
// ===== controllers
import driverLocationController from '../../app/controllers/drivers/driver.location.controller.js';

const driverLocationRouter = express.Router();

driverLocationRouter.get('/:id', driverLocationController.show);

export default driverLocationRouter;