/**
 * @file app/middlewares/validations/validators/reserve/guest.cancel.validator.js
 * @description 취소 예약 데이터 유효성 체크
 * 251231 v1.0.0 N init
 */

import reservationField from "../../fields/reservation.field.js";
import bookerField from "../../fields/booker.field.js";

export default [
  reservationField.cancelCode, reservationField.cancelReason,
  bookerField.lookupPassword,
];