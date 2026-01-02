/**
 * @file app/middlewares/validations/validators/drivers/store.validator.js
 * @description 기사 관리 store 검사기
 * 250101 v1.0.0 김민현 init
 */
import { driverName, accountId, password, phone, carNumber, email } from "../../fields/driver.field.js";

export default [
  driverName,
  accountId,
  password,
  phone,
  carNumber,
  email
];