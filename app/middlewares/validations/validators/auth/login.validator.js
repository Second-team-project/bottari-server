/**
 * @file app/middlewares/validations/validators/auth/login.validator.js
 * @description 로그인용 유효성 체크
 * 251218 v1.0.0 김민현 init
 */
import adminField from "../../fields/admin.field.js";

export default [adminField.accountId, adminField.password];