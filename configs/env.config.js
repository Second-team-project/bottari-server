/**
 * @file configs/env.config.js
 * @description 환경에 따른 env 설정 파일
 * 251213 v1.0.0 N init
 */

import fs from 'fs';
import dotenv from 'dotenv';

// NODE_ENV 값에 따라 env 파일 선택 (기본값: development)
const env = process.env.NODE_ENV || 'development';

// 환경별 파일 매핑
const envFileMap = {
  production: '.env.production',
  test: '.env.test',
  development: '.env'
};

// env에 담긴 값 따라 env 파일 선택 (기본값: .env)
const filePath = envFileMap[env] || '.env';

// 파일 존재 확인 후 로드
  // 1. 'filePath' 파일이 있다면
if (fs.existsSync(filePath)) {
  // 1-1. 해당 파일 읽을 것
  dotenv.config({ path: filePath });
  console.log(`Loaded env: ${filePath}`);

  // 2. 'filePath' 파일이 없다면
} else {
  console.warn(`Warning: ${filePath} not found!`);
}