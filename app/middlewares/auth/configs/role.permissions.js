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
    // ===== admin Page
    { path: /^\/api\/admin\/reservations$/, types: [ADMIN] },
    { path: /^\/api\/admin\/stats\/monthly$/, types: [ADMIN] },
    { path: /^\/api\/admin\/stats\/daily$/, types: [ADMIN] },
    { path: /^\/api\/admin\/drivers$/, types: [ADMIN] },
    { path: /^\/api\/admin\/store-emps$/, types: [ADMIN] },
    { path: /^\/api\/admin\/notices\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/faq\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/reservations\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/drivers\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/store-emps\/[0-9]+$/, types: [ADMIN] },
    // ===== user Page
    { path: /^\/api\/user\/reserve$/, types: [USER_TYPE.MEMBER] },
    { path: /^\/api\/user\/review\/reviewable$/, types: [USER_TYPE.MEMBER] },
    // ===== driver Page
    { path: /^\/api\/driver\/attendance\/status$/, types: [DRIVER] },
    { path: /^\/api\/driver\/deliveries\/assigned$/, types: [DRIVER] },
  ],
  POST: [
    // ===== admin Page
    { path: /^\/api\/admin\/auth\/logout$/, types: [ADMIN] },
    { path: /^\/api\/admin\/notices$/, types: [ADMIN] },
    { path: /^\/api\/admin\/reservations$/, types: [ADMIN] },
    { path: /^\/api\/admin\/faq$/, types: [ADMIN] },
    { path: /^\/api\/admin\/drivers$/, types: [ADMIN] },
    { path: /^\/api\/admin\/store-emps$/, types: [ADMIN] },
    { path: /^\/api\/files\/notices$/, roles: [ADMIN] },
    { path: /^\/api\/files\/faq$/, roles: [ADMIN] },
    // ===== user Page
    { path: /^\/api\/user\/auth\/logout$/, types: [USER_TYPE.MEMBER] },
    { path: /^\/api\/user\/reserve\/cancel\/[DS][MG]\d{6}[2-9A-Z]{5}$/, types: [USER_TYPE.MEMBER] },
    { path: /^\/api\/user\/review$/, types: [USER_TYPE.MEMBER] },
    // ===== driver Page
    { path: /^\/api\/driver\/attendance\/toggle$/, types: [DRIVER] },
    // ===== common Page - 알림 구독
    { path: /^\/api\/common\/subscriptions$/, types: [USER_TYPE.MEMBER, USER_TYPE.DRIVER, USER_TYPE.ADMIN] },
  ],
  PUT: [
    // ===== admin page
    { path: /^\/api\/admin\/notices\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/faq\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/drivers\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/store-emps\/[0-9]+$/, types: [ADMIN] },
  ],
  PATCH: [
    // ===== admin Page
    { path: /^\/api\/admin\/reservations\/[0-9]+$/, types: [ADMIN] },
    // ===== driver Page
    { path: /^\/api\/driver\/profile\/edit$/, types: [DRIVER] },
  ],
  DELETE: [
    // ===== admin Page
    { path: /^\/api\/admin\/notices\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/reservations\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/drivers\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/store-emps\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/faq\/[0-9]+$/, types: [ADMIN] },
    // ===== user Page
    { path: /^\/api\/user\/review\/[0-9]$/, types: [USER_TYPE.MEMBER] },
  ]
}
Object.freeze(ROLE_PERMISSIONS);

export default ROLE_PERMISSIONS;