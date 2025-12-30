/**
 * @file app/middlewares/multer/multer.middleware.js
 * @description multer 미들웨어(업로더를 모아서 내보내기)
 * 251230 v1.0.0 김민현 init
 */
import noticeUploader from "./uploaders/notice.uploader.js";

export default {
  noticeUploader,
}
