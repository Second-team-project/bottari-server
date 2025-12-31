/**
 * @file app/middlewares/validations/validators/search/location.validator.js
 * @description 소셜 로그인용 유효성 체크
 * 251220 v1.0.0 N init
 */

import searchField from "../../fields/search.field.js";

export default [ searchField.addrKeyword, searchField.page ];