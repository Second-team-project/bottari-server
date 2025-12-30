/**
 * @file app/middlewares/validations/validators/faq/store.validator.js
 * @description FAQ store 검사기
 * 251231 v1.0.0 김민현 init
 */
import FAQField from "../../fields/FAQ.field.js";

export default [FAQField.title, FAQField.content, FAQField.image];