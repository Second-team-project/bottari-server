/**
 * @file app/middlewares/auth/configs/role.permissions.js
 * @description 요청별 접근 권한 설정
 * 251218 v1.0.0 김민현 init
 */
import ROLE from "../../../../configs/admin.role.enum.js";

const { ADMIN } = ROLE;

// 인증 및 인가가 필요한 요청만 정의해야 함
const ROLE_PERMISSIONS = {
  GET: [

  ],
  POST: [
    { path: /^\/api\/admin\/auth\/logout$/, roles: [ADMIN] },
    { path: /^\/api\/admin\/auth\/reissue$/, roles: [ADMIN] },

  ],
  PUT: [

  ],
  DELETE: [

  ]
}
Object.freeze(ROLE_PERMISSIONS);

export default ROLE_PERMISSIONS;