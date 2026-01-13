/**
 * @file app/middlewares/validations/validators/emps/update.validator.js
 * @description 직원 관리 update 검사기
 * 250102 v1.0.0 김민현 init
 */
import empField from "../../fields/admin.field.js";

export default [
  empField.paramId,
  empField.adminName,
  empField.phone,
  empField.email,
  empField.code,
];