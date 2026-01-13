/**
 * @file routes/user/reserve.router.js
 * @description 예약 관련 라우터
 * 251221 v1.0.0 N init
 */

import express from 'express';
// ===== controller
import reserveController from '../../app/controllers/user/reserve.controller.js';
// ===== validator
import { draftDeliveryValidator, draftStorageValidator } from '../../app/middlewares/validations/validators/reserve/user.draft.validator.js';
import { userCancelValidator, guestCancelValidator } from '../../app/middlewares/validations/validators/reserve/user.cancel.validator.js';
import { completePaymentValidator, confirmTossPaymentValidator } from '../../app/middlewares/validations/validators/reserve/reservation.validator.js';
import guestLookupValidator from '../../app/middlewares/validations/validators/reserve/guest.lookup.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== middleware
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';


const userReserveRouter = express.Router();

// 결제 전 예약 데이터 생성
userReserveRouter.post('/draft/delivery', draftDeliveryValidator, validationHandler, reserveController.deliveryDraft);
userReserveRouter.post('/draft/storage', draftStorageValidator, validationHandler, reserveController.storageDraft);
// 결제 확인
userReserveRouter.post('/confirm/payment', confirmTossPaymentValidator, validationHandler, reserveController.confirmTossPayment);
// 결제 완료
userReserveRouter.get('/complete/:reserveCode', completePaymentValidator, validationHandler, reserveController.completePayment);
// 예약 조회
userReserveRouter.get('/', authMiddleware, reserveController.userReservation);
userReserveRouter.post('/guest', guestLookupValidator, validationHandler, reserveController.guestReservation);
// 예약 취소
userReserveRouter.post('/guest/cancel/:code', guestCancelValidator, validationHandler, reserveController.guestCancel);
userReserveRouter.post('/cancel/:code', authMiddleware, userCancelValidator, validationHandler, reserveController.userCancel);

export default userReserveRouter;