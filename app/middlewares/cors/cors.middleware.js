/**
 * @file app/middlewares/cors/cors.middleware.js
 * @description cors Middleware
 * 260112 KWM init
 */

import cors from 'cors';
import customError from '../../errors/custom.error.js';
import { FORBIDDEN_ERROR } from '../../../configs/responseCode.config.js';

const allowedOrigins = [
  process.env.APP_USER_URL,
  process.env.APP_DRIVER_URL,
  'https://admin-two-ecru-70.vercel.app',
];

export default cors({
		origin: function (origin, callback) {
				// origin이 없거나(ex. Postman), 허용된 목록에 있으면
				if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.APP_MODE === 'dev') {
						callback(null, true); // 허용
				} else {
						callback(customError('Not allowed by CORS', FORBIDDEN_ERROR)); // 거부
				}
		},
    credentials: true,
});