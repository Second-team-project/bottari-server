/**
 * @file app/middlewares/validations/validators/reserve/reservation.validator.js
 * @description 결제 예약 데이터 유효성 체크
 * 251223 v1.0.0 N init
 */

import reservationField from "../../fields/reservation.field.js";

export default [ reservationField.type, reservationField.userId, reservationField.userType ];