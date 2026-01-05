/**
 * @file app/middlewares/validations/validators/reserve/driver.statusChange.validator.js
 * @description 예약 상태 변경 유효성 체크
 * 260102 v1.0.0 김위민 init
 */

import reservationField from "../../fields/reservation.field.js";

export default [ reservationField.resId, reservationField.currentState ];