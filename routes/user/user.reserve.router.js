/**
 * @file routes/user/reserve.router.js
 * @description 예약 관련 라우터
 * 251221 v1.0.0 N init
 */

import express from 'express';
// ===== controller
import reserveController from '../../app/controllers/user/reserve.controller.js';
// ===== validator
import storageDraftValidator from '../../app/middlewares/validations/validators/reserve/storage.draft.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';


const userReserveRouter = express.Router();

userReserveRouter.post('/draft/delivery', reserveController.deliveryDraft);
userReserveRouter.post('/draft/storage', storageDraftValidator, validationHandler, reserveController.storageDraft);
userReserveRouter.post('/confirm/payment', reserveController.confirmTossPayment);

export default userReserveRouter;