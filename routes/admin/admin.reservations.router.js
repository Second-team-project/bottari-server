/**
 * @file routes/admin/admin.reservations.router.js
 * @description 예약 관리 관련 라우터
 * 251224 v1.0.0 김민현 init
 */
import express from 'express';
import adminReservationsController from '../../app/controllers/admins/admin.reservations.controller.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
import { idValidator, indexValidator, storeValidator, updateValidator } from '../../app/middlewares/validations/validators/reserve/admin.reservation.validator.js';

const adminReservationRouter = express.Router();

adminReservationRouter.use(authMiddleware);

adminReservationRouter.get('/', indexValidator, validationHandler, adminReservationsController.index);
adminReservationRouter.get('/:id',idValidator, validationHandler, adminReservationsController.show);
adminReservationRouter.post('/', storeValidator, validationHandler, adminReservationsController.store);
adminReservationRouter.patch('/:id', idValidator, updateValidator, validationHandler, adminReservationsController.update);
adminReservationRouter.delete('/:id',idValidator, validationHandler, adminReservationsController.destroy);

export default adminReservationRouter;