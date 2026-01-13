import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
//
import './configs/env.config.js';
import db from './app/models/index.js';

// ===== routers import
import testRouter from './routes/test.route.js'

// === common
import filesRouter from './routes/files.router.js';
import subscriptionRouter from './routes/subscription.router.js';

// === user
import userAuthRouter from './routes/user/user.auth.router.js';
import userSearchRouter from './routes/user/user.search.router.js';
import userReserveRouter from './routes/user/user.reserve.router.js';
import userReviewRouter from './routes/user/user.review.router.js';
import userGuideImgRouter from './routes/user/user.guide.router.js';
import userNoticesRouter from './routes/user/user.notices.router.js';
import userFAQRouter from './routes/user/user.FAQ.router.js';

// === driver
import driverAuthRouter from './routes/drivers/driver.auth.router.js';
import driverProfileRouter from './routes/drivers/driver.profile.router.js';
import driverAttendanceRouter from './routes/drivers/driver.Attendance.router.js';
import driverDeliveriesRouter from './routes/drivers/driver.deliveries.router.js';
import driverLocationRouter from './routes/drivers/driver.location.router.js';

// === admin
import adminAuthRouter from './routes/admin/admin.auth.router.js';
import adminReservationRouter from './routes/admin/admin.reservations.router.js';
import adminNoticesRouter from './routes/admin/admin.notices.router.js';
import adminFAQRouter from './routes/admin/admin.FAQ.router.js';
import adminStatsRouter from './routes/admin/admin.stats.router.js';
import adminDriversRouter from './routes/admin/admin.drivers.router.js';
import adminStoreEmpsRouter from './routes/admin/admin.storeEmps.router.js';
import adminPricingRouter from './routes/admin/admin.pricing.router.js';
import adminAdditionalPricingRouter from './routes/admin/admin.additionalPricing.router.js';
import adminStoreRouter from './routes/admin/admin.store.router.js';
import adminguideImgRouter from './routes/admin/admin.guide.router.js';
import adminUsersRouter from './routes/admin/admin.users.router.js';

// === chat
import chatRouter from './routes/chat.router.js';

// ===== handlers import
import errorHandler from './app/errors/error.handler.js';
import { initChatSocket } from './app/utils/socket/socket.js';
import corsMiddleware from './app/middlewares/cors/cors.middleware.js';

// express 애플리케이션 객체 생성
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());  // cookie 파서
app.use(express.urlencoded({ extended: true }));  // toss

// ------------------------------------------
// ||     Socket.IO 서버 생성
// ------------------------------------------
const server = createServer(app); // 서버 생성 (HTTP 모듈)
const io = new Server(server, {   // 웹소켓 요청(ws://) -> io (Socket.io)가 가로채서 처리
  cors: {
    origin: [ process.env.APP_USER_URL, process.env.APP_ADMIN_URL],  // 클라이언트 주소
    credentials: true  // 쿠키 헤더 설정
  }
});

// ------------------------------------------
// ||     DB 연결 확인
// ------------------------------------------
db.sequelize.authenticate()
.then(() => {
  console.log('✅ DB 연결 성공!');
  console.log('APP_MODE:', process.env.APP_MODE);
  })
  .catch((err) => {
    console.error('❌ DB 연결 실패:', err);
  });

// ------------------------------------------
// ||     정적 파일 제공 등록
// ------------------------------------------
// review 이미지
app.use(process.env.ACCESS_FILE_REVIEW_IMAGE_PATH, express.static(path.resolve(process.env.FILE_REVIEW_IMAGE_PATH)));
// 가이드 이미지
app.use(process.env.ACCESS_FILE_GUIDE_IMAGE_PATH, express.static(path.resolve(process.env.FILE_GUIDE_IMAGE_PATH)));
// 공지사항 이미지
app.use(process.env.ACCESS_FILE_NOTICE_IMAGE_PATH, express.static(path.resolve(process.env.FILE_NOTICE_IMAGE_PATH)));
// FAQ 이미지
app.use(process.env.ACCESS_FILE_FAQ_IMAGE_PATH, express.static(path.resolve(process.env.FILE_FAQ_IMAGE_PATH)));
// 채팅 이미지
app.use(process.env.ACCESS_FILE_CHAT_IMAGE_PATH, express.static(path.resolve(process.env.FILE_CHAT_IMAGE_PATH)));

// ------------------------------------------
// ||     라우터 정의
// ------------------------------------------
// 테스트 라우트
app.use('/api/test', testRouter);

// ===== 공용
// 이미지 업로더
app.use('/api/common/files', filesRouter);
// 푸시 알림 구독
app.use('/api/common/subscriptions', subscriptionRouter);
// 채팅
app.use('/api/chat', chatRouter);

// ===== user용
// 소셜 로그인
app.use('/api/user/auth', userAuthRouter);
// 주소 검색
app.use('/api/user/search', userSearchRouter);
// 예약
app.use('/api/user/reserve', userReserveRouter);
// 리뷰
app.use('/api/user/review', userReviewRouter);
// 가이드 이미지
app.use('/api/user/guide-img', userGuideImgRouter)
// 공지사항
app.use('/api/user/notices', userNoticesRouter);
// FAQ
app.use('/api/user/faq', userFAQRouter);


// ===== driver용
// 로그인
app.use('/api/driver/auth', driverAuthRouter);
// 개인정보 수정
app.use('/api/driver/profile', driverProfileRouter);
// 출퇴근 상태 수정
app.use('/api/driver/attendance', driverAttendanceRouter);
// 배정된 예약 정보
app.use('/api/driver/deliveries', driverDeliveriesRouter);
// 위치 정보
app.use('/api/driver/location', driverLocationRouter);


// ===== admin용
// 로그인
app.use('/api/admin/auth', adminAuthRouter);
// 공지사항
app.use('/api/admin/notices', adminNoticesRouter);
// FAQ
app.use('/api/admin/faq', adminFAQRouter);
// 예약 관리
app.use('/api/admin/reservations', adminReservationRouter);
// 통계
app.use('/api/admin/stats', adminStatsRouter);
// 기사 관리
app.use('/api/admin/drivers', adminDriversRouter);
// 직원 관리
app.use('/api/admin/store-emps', adminStoreEmpsRouter);
// 요금
app.use('/api/admin/pricing', adminPricingRouter);
app.use('/api/admin/pricing/additional', adminAdditionalPricingRouter);
// 보관소
app.use('/api/admin/store', adminStoreRouter);
// 가이드 이미지
app.use('/api/admin/guide-img', adminguideImgRouter)
// 유저 관리
app.use('/api/admin/users', adminUsersRouter)


// ------------------------------------------
// ||     404 처리
// ------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    code: 'E20',
    message: '제공되지 않는 서비스입니다.'
  });
});

// ------------------------------------------
// ||     뷰 반환 처리
// ------------------------------------------
// 퍼블릭 정적 파일 제공 활성화
app.use('/', express.static(process.env.APP_DIST_PATH));
// Recat 뷰 반환
//         ↱ (?!1) : 1제외하고 → ?!\/files : /files 제외하고
app.get(/^(?!\/files).*/, (req, res) => {
  return res.sendFile(pathUtil.getViewDirPath());
})

// ------------------------------------------
// ||     등록
// ------------------------------------------
// 에러 핸들러 등록
app.use(errorHandler);

// 소켓 이벤트 핸들러 등록
initChatSocket(io);

// ------------------------------------------
// ||     서버 실행
// ------------------------------------------
// 위에서 생성한 소켓 서버로 실행
server.listen(parseInt(process.env.APP_PORT), () => {
  console.log(`🚀 서버 실행: http://localhost:${process.env.APP_PORT}`);
});
