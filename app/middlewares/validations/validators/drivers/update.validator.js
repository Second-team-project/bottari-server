/**
 * @file app/middlewares/validations/validators/drivers/update.validator.js
 * @description 기사 관리 update 검사기
 * 250101 v1.0.0 김민현 init
 */
import { paramId, driverName, phone, carNumber, email } from "../../fields/driver.field.js";

export default [
  paramId,
  driverName,
  phone,
  carNumber,
  email,
];