/**
 * @file routes/chat.router.js
 * @description 채팅 관련 라우터
 * 2601009 v1.0.0 N init
 */

import express from 'express';
// ===== validators

// ===== controllers


const chatRouter = express.Router();

// 채팅방 조회
chatRouter.get('/rooms', chatController.index);
// 채팅방 생성
chatRouter.post('/rooms', chatController.store);
// 채팅 메세지 조회
chatRouter.get('/rooms/:id/messge', chatController.indexMessage);


export default chatRouter;