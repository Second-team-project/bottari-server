/**
 * @file app/models/index.js
 * @description Sequelize 인스턴스 생성 File
 * 251212 v1.0.0 N init
 */

import '../../configs/env.config.js';
import { Sequelize } from 'sequelize';

// 모델 import
import Driver from './Driver.js';
import DriverAssignment from './DriverAssignment.js';
import DriverAttendanceLog from './DriverAttendanceLog.js';
import Delivery from './Delivery.js';
import Booker from './Booker.js';
import Luggage from './Luggage.js';
import Push from './Push.js';
import Reservation from './Reservation.js';
import Review from './Review.js';
import Storage from './Storage.js';
import User from './User.js';
import Admin from './Admin.js';
import Notice from './Notice.js';
import FAQ from './FAQ.js';
import GuideImg from './GuideImg.js';
import Pricing from './Pricing.js';
import Store from './Store.js';

const db = {}; // 생성할 모델들 모두 담음

const sequelize = new Sequelize(
  process.env.DB_MYSQL_DB_NAME        // DB명
  , process.env.DB_MYSQL_USER         // DB 접속 유저
  , process.env.DB_MYSQL_PASSWORD     // DB 접속 패스워드
  ,{
    host: process.env.DB_MYSQL_HOST                     // 사용 DB Host
    ,port: parseInt(process.env.DB_MYSQL_PORT)          // 사용 DB Port
    ,dialect: process.env.DB_MYSQL_DIALECT              // 사용 DB 드라이버
    ,timezone: process.env.DB_MYSQL_TIMEZONE            // 타임존
    ,logging: process.env.DB_MYSQL_LOG_FLG === 'true' && console.log  // DB Loggin on/off (로그가 필요한 경우만 true, 배포시 false로 조절)
    ,dialectOptions: {
      dateStrings: true  // 문자열로 날짜 받기
    }
    ,pool: { // 커넥션풀 설정
      max: parseInt(process.env.DB_MYSQL_CONNECTION_COUNT_MAX),   // 최대 커넥션 수
      min: parseInt(process.env.DB_MYSQL_CONNECTION_COUNT_MIN),   // 최소 커넥션 수
      acquire: parseInt(process.env.DB_MYSQL_ACQUIRE_LIMIT),      // 연결 최대 대기 시간 (ms)
      idle: parseInt(process.env.DB_MYSQL_IDLE_LIMIT)             // 유휴 커넥션 유지 시간 (ms)
    }
  }
);

db.sequelize = sequelize;

// 모델 초기화
// User
db.Delivery = Delivery.init(sequelize)
db.Booker = Booker.init(sequelize)
db.Luggage = Luggage.init(sequelize)
db.Push = Push.init(sequelize)
db.Reservation = Reservation.init(sequelize)
db.Review = Review.init(sequelize)
db.Storage = Storage.init(sequelize)
db.User = User.init(sequelize)
// Driver
db.Driver = Driver.init(sequelize);
db.DriverAssignment = DriverAssignment.init(sequelize);
db.DriverAttendanceLog = DriverAttendanceLog.init(sequelize);
// Admin
db.Admin = Admin.init(sequelize)
db.Notice = Notice.init(sequelize)
db.FAQ = FAQ.init(sequelize)
db.GuideImg = GuideImg.init(sequelize)
db.Pricing = Pricing.init(sequelize)
db.Store = Store.init(sequelize)



// 모델 관계 설정
// User
User.associate(db);
Booker.associate(db);
Reservation.associate(db);
Delivery.associate(db);
Storage.associate(db);
Luggage.associate(db);
Push.associate(db);
Review.associate(db);
// Driver
Driver.associate(db);
DriverAssignment.associate(db);
DriverAttendanceLog.associate(db);
// Admin
Admin.associate(db);
Notice.associate(db);
FAQ.associate(db);
Store.associate(db);


export default db;