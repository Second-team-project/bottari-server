/**
 * @file routes/admin/admin.reservations.router.js
 * @description 예약 관리 관련 라우터
 * 251224 v1.0.0 김민현 init
 */
import express from 'express';
import adminReservationsController from '../../app/controllers/admins/admin.reservations.controller.js';

const adminReservationRouter = express.Router();

adminReservationRouter.use('/', adminReservationsController.index);
adminReservationRouter.use('/:id', adminReservationsController.show);
adminReservationRouter.use('/', adminReservationsController.store);
adminReservationRouter.use('/:id', adminReservationsController.destroy);

export default adminReservationRouter;