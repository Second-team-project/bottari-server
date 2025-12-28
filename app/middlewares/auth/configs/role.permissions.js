/**
 * @file app/middlewares/auth/configs/role.permissions.js
 * @description 요청별 접근 권한 설정
 * 251218 v1.0.0 김민현 init
 */
import USER_TYPE from "../../../../configs/user.type.enum.js";

const { ADMIN, DRIVER } = USER_TYPE;

// 인증 및 인가가 필요한 요청만 정의해야 함
const ROLE_PERMISSIONS = {
  GET: [
    { path: /^\/api\/admin\/notices\/[0-9]+$/, types: [ADMIN] },
    // ===== user Page
    { path: /^\/api\/user\/reserve$/, types: [USER_TYPE.MEMBER] },
    // ===== driver Page
    { path: /^\/api\/driver\/attendance\/status$/, types: [DRIVER] },
  ],
  POST: [
    { path: /^\/api\/admin\/auth\/logout$/, types: [ADMIN] },
    { path: /^\/api\/admin\/notices$/, types: [ADMIN] },
    // ===== user Page
    { path: /^\/api\/user\/auth\/logout$/, types: [USER_TYPE.MEMBER, USER_TYPE.GUEST] },
    // ===== driver Page
    { path: /^\/api\/driver\/attendance\/toggle$/, types: [DRIVER] },
  ],
  PUT: [

  ],
  PATCH: [
    { path: /^\/api\/driver\/profile\/edit$/, types: [DRIVER] },
  ],
  DELETE: [
    { path: /^\/api\/admin\/notices\/[0-9]+$/, types: [ADMIN] }
  ]
}
Object.freeze(ROLE_PERMISSIONS);

export default ROLE_PERMISSIONS;