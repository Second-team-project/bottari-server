/**
 * @file routes/user/guide.router.js
 * @description 이미지 관련 라우터
 * 260101 v1.0.0 N init
 */

import express from 'express';
// ===== validators
// ===== controllers
import guideImgController from '../../app/controllers/user/guideImg.controller.js';

const userGuideImgRouter = express.Router();

userGuideImgRouter.get('/', guideImgController.index);

export default userGuideImgRouter;