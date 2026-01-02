/**
 * @file app/middlewares/validations/validators/emps/store.validator.js
 * @description 직원 관리 store 검사기
 * 250102 v1.0.0 김민현 init
 */
import empField from "../../fields/admin.field.js";

export default [
  empField.adminName,
  empField.accountId,
  empField.password,
  empField.phone,
  empField.code,
  empField.email
];