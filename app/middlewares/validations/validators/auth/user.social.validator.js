/**
 * @file app/middlewares/validations/validators/auth/social.validator.js
 * @description 유저 소셜 로그인용 유효성 체크
 * 251220 v1.0.0 N init
 */

import userField from "../../fields/user.field.js";

export default [ userField.provider ];