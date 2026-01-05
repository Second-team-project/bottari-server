/**
 * @file routes/drivers/driver.deliveries.router.js
 * @description 배정된 예약 정보 라우터
 * 251230 v1.0.0 김위민 init
 */

import express from 'express';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
import driverDeliveriesController from '../../app/controllers/drivers/driver.deliveries.controller.js';
import driverStatusChangeValidator from '../../app/middlewares/validations/validators/reserve/driver.statusChange.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';

const driverDeliveriesRouter = express.Router();

driverDeliveriesRouter.get('/assigned', authMiddleware, driverDeliveriesController.getAssignedDeliveries);

driverDeliveriesRouter.patch('/state', authMiddleware, driverStatusChangeValidator, validationHandler, driverDeliveriesController.updateDeliveryState);

export default driverDeliveriesRouter;