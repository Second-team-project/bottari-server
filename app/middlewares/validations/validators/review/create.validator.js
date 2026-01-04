/**
 * @file app/middlewares/validations/validators/review/create.validator.js
 * @description 리뷰 작성용 유효성 체크
 * 260103 v1.0.0 N init
 */

import reservationField from "../../fields/reservation.field.js";
import reviewField from "../../fields/review.field.js";

export default [ reviewField.title, reviewField.content, reservationField.reservId ];