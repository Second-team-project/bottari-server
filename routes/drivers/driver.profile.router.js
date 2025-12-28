/**
 * @file routes/drivers/driver.profile.router.js
 * @description 기사 프로필 라우터
 * 251225 v1.0.0 김위민 init
 */

import express from 'express';
import driverProfileValidator from '../../app/middlewares/validations/validators/profile/driver.profile.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
import driverProfileController from '../../app/controllers/drivers/driver.profile.controller.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';

const driverProfileRouter = express.Router();

driverProfileRouter.patch('/edit', authMiddleware, driverProfileValidator, validationHandler, driverProfileController.driverEditProfile);

export default driverProfileRouter;