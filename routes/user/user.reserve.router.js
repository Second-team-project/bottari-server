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
// ===== middleware
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';


const userReserveRouter = express.Router();

// 결제 전 예약 데이터 생성
userReserveRouter.post('/draft/delivery', deliveryDraftValidator, validationHandler, reserveController.deliveryDraft);
userReserveRouter.post('/draft/storage', storageDraftValidator, validationHandler, reserveController.storageDraft);
// 결제 확인
userReserveRouter.post('/confirm/payment', reserveController.confirmTossPayment);
// 결제 완료
userReserveRouter.get('/complete/:reserveCode', reserveController.completePayment);
// 예약 조회
userReserveRouter.get('/', authMiddleware, reserveController.userReservation);
userReserveRouter.post('/guest', reserveController.guestReservation);

export default userReserveRouter;