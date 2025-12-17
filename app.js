import express from 'express';
import cors from 'cors';
import './configs/env.config.js';
import db from './app/models/index.js';

// ===== 라우터 import
import testRouter from './routes/test.route.js'
import authRouter from './routes/auth.router.js';

// ===== handler import
import errorHandler from './app/errors/error.hander.js';

const app = express();

app.use(express.json());

// 개발 환경에서만 CORS 허용
// TODO 클라이언트 프록시로 변경할 것
// if (process.env.APP_MODE === 'dev') {
//   app.use(cors({
//   origin: 'http://localhost:5173',  // 프론트 주소 명시
//   credentials: true                 // 쿠기 정보 주고 받음
//   }));
// }

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
// ||     라우터 정의
// ------------------------------------------
// 테스트 라우트
app.use('/api/test', testRouter);
// 소셜 로그인
app.use('/api/auth', authRouter);

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
// ||     등록
// ------------------------------------------
// 에러 핸들러 등록
app.use(errorHandler);

// ------------------------------------------
// ||     서버 실행
// ------------------------------------------
app.listen(parseInt(process.env.APP_PORT), () => {
  console.log(`🚀 서버 실행: http://localhost:${process.env.APP_PORT}`);
});
