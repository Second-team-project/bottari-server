/**
 * @flie app/middlewares/validations/fields/attendance.field.js
 * @description 기사 출퇴근 검사 필드
 * 251227 v1.0.0 김위민 init
 */

import { body } from "express-validator";

export const attendanceToggle = body('nextState')
  .exists()
  .withMessage('변경할 상태 값이 필요합니다.')
  .isIn(['CLOCKED_IN', 'CLOCKED_OUT'])
  .withMessage('올바르지 않은 근무 상태 형식입니다.')
;