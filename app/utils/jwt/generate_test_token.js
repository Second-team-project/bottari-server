import '../../../configs/env.config.js';
import jwtUtil from './jwt.util.js';
import USER_TYPE from '../../../configs/user.type.enum.js';

const dummyUser = {
  id: 1, // 테스트용 ID
  type: USER_TYPE.MEMBER
};

try {
  const accessToken = jwtUtil.generateAccessToken(dummyUser);
} catch (error) {
  console.error('토큰 생성 실패:', error);
}

// node server/generate_test_token.js