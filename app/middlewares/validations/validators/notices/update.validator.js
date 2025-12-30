/**
 * @file app/middlewares/validations/validators/notices/update.validator.js
 * @description 공지사항 게시글 update 검사기
 * 251230 v1.0.0 김민현 init
 */
import noticeField from "../../fields/notice.field.js";

export default [noticeField.id, noticeField.title, noticeField.content, noticeField.image];