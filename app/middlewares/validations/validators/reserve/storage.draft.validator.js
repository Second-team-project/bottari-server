/**
 * @file app/middlewares/validations/validators/reserve/storage.draft.validator.js
 * @description 결제 예약 데이터 유효성 체크
 * 251224 v1.0.0 N init
 */

import bookerField from "../../fields/booker.field.js";
import luggageField from "../../fields/luggage.field.js";
import reservationField from "../../fields/reservation.field.js";
import storageField from "../../fields/storage.field.js";

export default [
  // 예약
  reservationField.type, reservationField.userId, reservationField.userType, 
  // 예약자
  bookerField.phone, bookerField.email, bookerField.password, bookerField.userName,
  // 짐
  luggageField.luggageList, 
  // 보관
  storageField.price, storageField.startedAt, storageField.endedAt, storageField.storeId, storageField.notes,
];