/**
 * @file routes/user/reserve.router.js
 * @description 예약 관련 라우터
 * 251221 v1.0.0 N init
 */

import express from 'express';
import reserveController from '../../app/controllers/user/reserve.controller.js';

const userReserveRouter = express.Router();

userReserveRouter.post('/draft/delivery', reserveController.deliveryDraft);
userReserveRouter.post('/draft/storage', reserveController.storageDraft);
userReserveRouter.post('/confirm/payment', reserveController.confirmPayment);

export default userReserveRouter;