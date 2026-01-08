/**
 * @file app/sevices/subscription.service.js
 * @description 푸시 알림 구독 Service
 * 260104 N init
 */

import USER_TYPE from '../../configs/user.type.enum.js';
import pushRepository from '../repositories/push.repository.js';
import webpush from '../../configs/webpush.config.js';

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
};

/**
 * 메세지 발송 로직(메세지를 보내야 할 서비스에서 함수 호출로 사용)
 * @param {number} targetId 
 * @param {string} userType - USER_TYPE Enum 사용
 * @param {{title: string, massege: string, data: { targetUrl: string }}} messageData 
 */
async function sendPushNotification(targetId, userType, messageData) {
  // GUEST 타입이나 유저 타입에 정의되지 않은 대상은 푸시 발송 대상에서 제외
  if (!userType || userType === USER_TYPE.GUEST) {
    return;
  }

  // DB에서 해당 유저의 모든 구독 정보 조회 (Repository 활용)
  const subscriptions = await pushRepository.findAllByUserId(targetId, userType);

  // 구독 정보가 없을 시 바로 리턴
  if (!subscriptions || subscriptions.length === 0) {
    return;
  }

  // 메시지 발송
  const sendPromises = subscriptions.map(async sub => {
    return webpush.sendNotification(
      {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth
        }
      },
      JSON.stringify(messageData)
    ).catch(err => {
      if (err.statusCode === 410) sub.destroy(); // 차단된 유저는 DB에서 삭제
    });
  });

  // 모든 발송 작업이 끝날 때까지 대기
  await Promise.all(sendPromises);
};

export default {
  register,
  sendPushNotification
}