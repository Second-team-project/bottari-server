/**
 * @file app/middlewares/validations/validators/auth/driver.login.validator.js
 * @description 기사 로그인용 유효성 체크
 * 251222 v1.0.0 김위민 init
 */

import { id, password } from "../../fields/driver.field.js";

export default [id, password];