/**
 * @file app/middlewares/validations/validators/profile/driver.profile.validator.js
 * @description 기사 개인정보 수정 유효성 체크
 * 251225 v1.0.0 김위민 init
 */

import { driverName, phone, carNumber, email } from "../../fields/driver.field.js";

export default [driverName, phone, carNumber, email];