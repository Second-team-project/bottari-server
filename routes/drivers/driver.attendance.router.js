/**
 * @file routes/drivers/driver.attendance.router.js
 * @description 기사 출퇴근 라우터
 * 251227 v1.0.0 김위민 init
 */

import express from 'express';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
import driverAttendanceValidator from '../../app/middlewares/validations/validators/attendance/driver.attendance.validator.js';
import driverAttendanceController from '../../app/controllers/drivers/driver.attendance.controller.js';

const driverAttendanceRouter = express.Router();

driverAttendanceRouter.get('/status', authMiddleware, driverAttendanceController.getAttendanceStatus);

driverAttendanceRouter.post('/toggle', authMiddleware, driverAttendanceValidator, validationHandler, driverAttendanceController.handleAttendance);

export default driverAttendanceRouter;