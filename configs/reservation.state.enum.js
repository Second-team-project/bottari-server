/**
 * @file configs/reservation.state.enum.js
 * @description 예약 상태 Enum
 * 251229 v1.0.0 김민현 init
 */

export const RESERVATION_STATE = Object.freeze({
  PENDING_PAYMENT: 'PENDING_PAYMENT', // 결제 대기
  RESERVED: 'RESERVED',               // 예약 확정 (결제 완료)
  IN_PROGRESS: 'IN_PROGRESS',         // 진행 중 (배송/보관 중)
  COMPLETED: 'COMPLETED',             // 완료
  CANCELLED: 'CANCELLED',             // 취소됨
});