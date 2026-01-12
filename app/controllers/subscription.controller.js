/**
 * @file app/controllers/subscription.controller.js
 * @description 푸시 알림 구독 관련 컨트롤러
 * 20260104 N init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import customResponse from "../utils/custom.response.util.js";
// ===== services
import subscriptionService from "../services/subscription.service.js";

async function subscribe(req, res, next) {
  // {
  //   "subscription": {
  //     "endpoint": "https://fcm.googleapis.com/fcm/send/...",
  //     "keys": {
  //       "p256dh": "AHSK-D... (아주 긴 문자열)",
  //       "auth": "HJG-2... (짧은 문자열)"
  //     }
  //   },
  //   "deviceInfo": {
  //     "userAgent": "Mozilla/5.0 ... (브라우저 정보)",
  //     "language": "ko-KR"
  //   }
  // }
  try {
    const { subscription, deviceInfo } = req.body;
    const { endpoint, keys } = subscription;
    const { p256dh, auth } = keys;
    const { userAgent } = deviceInfo;

    const loggedInUser = req.user;

    const result = await subscriptionService.register({
      endpoint,
      p256dh,
      auth,
      device: userAgent,
      loggedInUser,
    });

    // return res.status(200).send(customResponse(SUCCESS, 'ok'))
    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  subscribe,
}