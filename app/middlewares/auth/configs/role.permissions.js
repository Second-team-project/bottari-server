/**
 * @file app/middlewares/auth/configs/role.permissions.js
 * @description 요청별 접근 권한 설정
 * 251218 v1.0.0 김민현 init
 */
import USER_TYPE from "../../../../configs/user.type.enum.js";

const { ADMIN, DRIVER, MEMBER, GUEST } = USER_TYPE;

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
    { path: /^\/api\/user\/reserve$/, types: [MEMBER] },
    { path: /^\/api\/user\/review\/reviewable$/, types: [MEMBER] },
    // ===== driver Page
    { path: /^\/api\/driver\/attendance\/status$/, types: [DRIVER] },
    { path: /^\/api\/driver\/deliveries\/assigned$/, types: [DRIVER] },
    // 채팅
    { path: /^\/api\/chat\/rooms$/, types: [ADMIN] },
    { path: /^\/api\/chat\/rooms\/[0-9]+\/messages$/, types: [MEMBER, GUEST, ADMIN] },
  ],
  POST: [
    // ===== admin Page
    { path: /^\/api\/admin\/auth\/logout$/, types: [ADMIN] },
    { path: /^\/api\/admin\/notices$/, types: [ADMIN] },
    { path: /^\/api\/admin\/reservations$/, types: [ADMIN] },
    { path: /^\/api\/admin\/faq$/, types: [ADMIN] },
    { path: /^\/api\/admin\/drivers$/, types: [ADMIN] },
    { path: /^\/api\/admin\/store-emps$/, types: [ADMIN] },
    { path: /^\/api\/files\/notices$/, types: [ADMIN] },
    { path: /^\/api\/files\/faq$/, types: [ADMIN] },
    // ===== user Page
    { path: /^\/api\/user\/auth\/logout$/, types: [MEMBER] },
    { path: /^\/api\/user\/reserve\/cancel\/[DS][MG]\d{6}[2-9A-Z]{5}$/, types: [MEMBER] },
    { path: /^\/api\/user\/review$/, types: [MEMBER] },
    // ===== driver Page
    { path: /^\/api\/driver\/attendance\/toggle$/, types: [DRIVER] },
    { path: /^\/api\/driver\/location$/, types: [DRIVER] },
    { path: /^\/api\/driver\/auth\/logout$/, types: [DRIVER] },
    // ===== common Page - 알림 구독
    { path: /^\/api\/common\/subscriptions$/, types: [MEMBER, DRIVER, ADMIN] },
    // 채팅
    { path: /^\/api\/chat\/rooms$/, types: [MEMBER, GUEST] },
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
    { path: /^\/api\/driver\/deliveries\/state$/, types: [DRIVER] },
    // 채팅
    { path: /^\/api\/chat\/rooms\/[0-9]+\/block$/, types: [ADMIN] },
  ],
  DELETE: [
    // ===== admin Page
    { path: /^\/api\/admin\/notices\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/reservations\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/drivers\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/store-emps\/[0-9]+$/, types: [ADMIN] },
    { path: /^\/api\/admin\/faq\/[0-9]+$/, types: [ADMIN] },
    // ===== user Page
    { path: /^\/api\/user\/review\/[0-9]+$/, types: [MEMBER] },
  ]
}
Object.freeze(ROLE_PERMISSIONS);

export default ROLE_PERMISSIONS;