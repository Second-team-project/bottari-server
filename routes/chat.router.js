/**
 * @file routes/chat.router.js
 * @description 채팅 관련 라우터
 * 260109 v1.0.0 N init
 */

import express from 'express';
// ===== middlewares
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
// ===== controllers
import chatController from '../app/controllers/chat.controller.js';

const chatRouter = express.Router();

// ===== 비회원 인증 (authMiddleware 없음!)
chatRouter.post('/guest/auth', chatController.guestAuth);

// ===== 인증 필요
// 채팅방 목록 조회
chatRouter.get('/rooms', authMiddleware, chatController.index);
// 채팅방 생성
chatRouter.post('/rooms', authMiddleware, chatController.store);
// 채팅 메시지 조회
chatRouter.get('/rooms/:id/messages', authMiddleware, chatController.indexMessage);
// 채팅방 차단
chatRouter.patch('/rooms/:id/block', authMiddleware, chatController.update);

export default chatRouter;
