/**
 * @file server/configs/responseCode.config.js
 * @description 서비스 전역 응답 코드 설정 모듈 (각 API 응답 시 참조되는 표준 응답 코드 정의)
 * 251213 v1.0.0 N init
 */

// --------------------
// || type import
// --------------------
/**
 * @typedef {import('./responseCode.config.type.js').ResponseCodeConfig} ResponseCodeConfig
 */

// --------------------

/**
 * 정상 처리 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const SUCCESS = {
  code: '00',
  msg: 'NORMAL_CODE',
  info: '정상 처리',
  status: 200
};
Object.freeze(SUCCESS);

/**
 * 로그인 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const NOT_REGISTERED_ERROR = {
  code: 'E01',
  msg: 'Unauthorized Error',
  info: '아이디 또는 비밀번호가 올바르지 않습니다.',
  status: 400
};
Object.freeze(NOT_REGISTERED_ERROR);

/**
 * 인증 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const UNAUTHORIZED_ERROR = {
  code: 'E02',
  msg: 'Unauthorized Error',
  info: '로그인이 필요한 서비스입니다.',
  status: 401 // Unauthorized
};
Object.freeze(UNAUTHORIZED_ERROR);

/**
 * 권한 부족 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const FORBIDDEN_ERROR = {
  code: 'E03',
  msg: 'Forbidden Error',
  info: '권한이 부족하여 제공할 수 없는 서비스입니다.',
  status: 403
};
Object.freeze(FORBIDDEN_ERROR);

/**
 * 토큰 만료 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const EXPIRED_TOKEN_ERROR = {
  code: 'E05',
  msg: 'Invalid Token Error',
  info: '만료된 토큰입니다.',
  status: 401
};
Object.freeze(EXPIRED_TOKEN_ERROR);

/**
 * 토큰 이상 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const INVALID_TOKEN_ERROR = {
  code: 'E06',
  msg: 'Invalid Token Error',
  info: '유효한 토큰이 아닙니다.',
  status: 401
};
Object.freeze(INVALID_TOKEN_ERROR);

/**
 * 중복 가입 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const CONFLICT_REGIST_ERROR = {
  code: 'E07',
  msg: 'Conflict Regist Error',
  info: '이미 가입 된 회원입니다.',
  status: 409
};
Object.freeze(CONFLICT_REGIST_ERROR);

/**
 * 권한 부족 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const UNMATCHING_USER_ERROR = {
  code: 'E08',
  msg: 'Unmatching User Error',
  info: '로그인한 유저로는 수행할 수 없는 작업입니다.',
  status: 403
};
Object.freeze(UNMATCHING_USER_ERROR);

/**
 * 리이슈 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const REISSUE_ERROR = {
  code: 'E09',
  msg: 'Reissue Error',
  info: '재발급 불가능합니다.',
  status: 401
};
Object.freeze(REISSUE_ERROR);


// =======================================================================


/**
 * 전역 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const NOT_FOUND_ERROR = {
  code: 'E20',
  msg: 'Not Found Error',
  info: '제공되지 않는 서비스입니다.',
  status: 404
};
Object.freeze(NOT_FOUND_ERROR);

/**
 * 파라미터 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const BAD_REQUEST_ERROR = {
  code: 'E21',
  msg: 'Bad Request Error',
  info: '입력 정보를 확인해 주세요.',
  status: 400
};
Object.freeze(BAD_REQUEST_ERROR);

/**
 * BAD_FILE_ERROR 코드 설정
 * @type {ResponseCodeConfig}
 */
const BAD_FILE_ERROR = {
  code: 'E22',
  msg: 'Bad File Error',
  info: '파일은 필수이며, 10MB 이하만 등록 가능합니다.',
  status: 400
};
Object.freeze(BAD_FILE_ERROR);

/**
 * 데이터 충돌 에러
 */
const CONFLICT_ERROR = {
  code: 'E23',
  msg: 'Conflict Error',
  info: '이미 존재하는 데이터입니다. 다시 시도해주세요.',
  status: 409
};
Object.freeze(CONFLICT_ERROR);


// =======================================================================


/**
 * 예약 코드 충돌로 진행 불가
 */
const RESERVE_CONFLICT_ERROR = {
  code: 'E40',
  msg: 'Reserve Conflict Error',
  info: '예약 처리 중 문제가 발생했습니다. 다시 시도해주세요.',
  status: 409
};
Object.freeze(RESERVE_CONFLICT_ERROR);

/**
 * 비회원 예약 조회 시 예약코드/비밀번호 매칭 실패
 */
const GUEST_AUTH_ERROR = {
  code: 'E41',
  msg: 'Not Reservation Error',
  info: '예약코드 또는 비밀번호가 올바르지 않습니다.',
  status: 400
};
Object.freeze(GUEST_AUTH_ERROR);

/**
 * 비회원으로 회원예약 조회 시도 시 에러
 */
const MEMBER_RESERVATION_ERROR = {
  code: 'E42',
  msg: 'Member Reservation Error',
  info: '회원 예약 내역입니다. 로그인 후 이용해주세요.',
  status: 401
}
Object.freeze(MEMBER_RESERVATION_ERROR);

/**
 * 쥐소하려는 예약이 '예약완료'외의 상태(진행중, 진행완료)일 때 에러
 */
const RESERVATION_NOT_CANCELLABLE = {
  code: 'E43',
  msg: 'Reservation not cancellable',
  info: '취소할 수 없는 예약 상태입니다.',
  status: 401
}
Object.freeze(RESERVATION_NOT_CANCELLABLE);

/**
 * 이미 결제된 예약건 
 */
const NO_ASSIGNMENT_ERROR = {
  code: 'E60',
  msg: 'No Assignment Error',
  info: '기사가 배정되지 않은 예약입니다.',
  status: 401
}
Object.freeze(NO_ASSIGNMENT_ERROR);


// =======================================================================


/**
 * 이미 결제된 예약건 
 */
const ALREADY_PAID_ERROR = {
  code: 'E44',
  msg: 'Already Paid Error',
  info: '이미 결제된 예약입니다.',
  status: 401
}
Object.freeze(ALREADY_PAID_ERROR);






// =======================================================================


/**
 * 시스템 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const SYSTEM_ERROR = {
  code: 'E99',
  msg: 'Application Error',
  info: '서비스 제공 상태가 원활하지 않습니다.',
  status: 500
}
Object.freeze(SYSTEM_ERROR);

/**
 * DB 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const DB_ERROR = {
  code: 'E80',
  msg: 'DB Error',
  info: '서비스 제공 상태가 원활하지 않습니다.',
  status: 500
}
Object.freeze(DB_ERROR);


export {
  // 01 - 로그인 관련
  SUCCESS,
  NOT_REGISTERED_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  EXPIRED_TOKEN_ERROR,
  INVALID_TOKEN_ERROR,
  CONFLICT_REGIST_ERROR,
  UNMATCHING_USER_ERROR,
  REISSUE_ERROR,

  // 20 - 전역
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  BAD_FILE_ERROR,
  CONFLICT_ERROR,
  
  // 40 - 예약 관련
  RESERVE_CONFLICT_ERROR,
  GUEST_AUTH_ERROR,
  MEMBER_RESERVATION_ERROR,
  RESERVATION_NOT_CANCELLABLE,
  ALREADY_PAID_ERROR,

  // 60 - 기사 관련
  NO_ASSIGNMENT_ERROR,

  SYSTEM_ERROR,
  DB_ERROR,
};