/**
 * @file routes/drivers/driver.auth.router.js
 * @description 로그인 라우터
 * 251218 v1.0.0 김위민 init
 */

import express from 'express';
import driverLoginValidator from '../../app/middlewares/validations/validators/auth/driver.login.validator.js';
import validationHandler from '../../app/middlewares/validation.handler.js';
import driverAuthController from '../../app/controllers/drivers/driver.auth.controller.js';

const driverAuthRouter = express.Router();

driverAuthRouter.post('/login', driverLoginValidator, validationHandler, driverAuthController.driverLogin);
driverAuthRouter.post('/reissue', driverAuthController.driverReissue);

export default driverAuthRouter;