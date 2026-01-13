/**
 * @file app/middlewares/validations/validators/reserve/guset.lookup.validator.js
 * @description 예약 데이터 비회원 조회 유효성 체크
 * 251228 v1.0.0 N init
 */

import bookerField from "../../fields/booker.field.js";
import reservationField from "../../fields/reservation.field.js";

export default [ reservationField.code, bookerField.lookupPassword ];