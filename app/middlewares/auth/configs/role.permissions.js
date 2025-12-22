/**
 * @file app/middlewares/auth/configs/role.permissions.js
 * @description 요청별 접근 권한 설정
 * 251218 v1.0.0 김민현 init
 */

import ROLE from "./role.enum.js";
import USER_TYPE from "../../../../configs/user.type.enum.js"

const { ADMIN, SUPER, NORMAL } = ROLE;

// 인증 및 인가가 필요한 요청만 정의해야 함
const ROLE_PERMISSIONS = {
  GET: [

  ],
  POST: [
    { path: /^\/api\/auth\/logout$/, roles: [NORMAL, SUPER] },
    { path: /^\/api\/auth\/reissue$/, roles: [NORMAL, SUPER] },
    // ===== user Page
    { path: /^\/api\/user\/auth\/logout$/, roles: [USER_TYPE.MEMBER, USER_TYPE.GUEST] },

  ],
  PUT: [
    { path: /^\/api\/users$/, roles: [NORMAL, SUPER] }
  ],
  DELETE: [

  ]
}
Object.freeze(ROLE_PERMISSIONS);

export default ROLE_PERMISSIONS;