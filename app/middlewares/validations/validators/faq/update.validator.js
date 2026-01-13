/**
 * @file app/middlewares/validations/validators/faq/update.validator.js
 * @description FAQ update 검사기
 * 251231 v1.0.0 김민현 init
 */
import FAQField from "../../fields/FAQ.field.js";

export default [FAQField.id, FAQField.title, FAQField.content, FAQField.image];