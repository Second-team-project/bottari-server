/**
 * @file app/sevices/subscription.service.js
 * @description 푸시 알림 구독 Service
 * 260104 N init
 */

import USER_TYPE from '../../configs/user.type.enum.js';
import pushRepository from '../repositories/push.repository.js';

async function register({ endpoint, p256dh, auth, device, loggedInUser, }) {
  // 저장 할 데이터 형식
  const payload = {
    endpoint,
    p256dh,
    auth,
    device,
    userId: null,
    driverId: null,
    adminId: null,
  };

  const userType = loggedInUser.type.toUpperCase();
  const userId = loggedInUser.id;

  switch (userType) {
    case USER_TYPE.MEMBER:
      payload.userId = userId;
      break;
    case USER_TYPE.DRIVER:
      payload.driverId = userId;
      break;
    case USER_TYPE.ADMIN:
      payload.adminId = userId;
      break;
    default:
      console.warn(`Unknown user type: ${userType}`);
  }

  const result = await pushRepository.upsert(null, payload);

  return result;
}

export default {
  register,
}