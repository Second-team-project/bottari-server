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
import deliveryDraftValidator from '../../app/middlewares/validations/validators/reserve/delivery.draft.validator.js';


const userReserveRouter = express.Router();

userReserveRouter.get('/complete/:reserveCode', reserveController.completePayment);
userReserveRouter.post('/draft/delivery', deliveryDraftValidator, validationHandler, reserveController.deliveryDraft);
userReserveRouter.post('/draft/storage', storageDraftValidator, validationHandler, reserveController.storageDraft);
userReserveRouter.post('/confirm/payment', reserveController.confirmTossPayment);

export default userReserveRouter;