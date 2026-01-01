/**
 * @file routes/guide.router.js
 * @description 보관소 관련 라우터
 * 250101 v1.0.0 N init
 */

import express from 'express';
// ===== validators
// ===== controllers
import guideImgController from '../app/controllers/guideImg.controller.js';

const guideImgRouter = express.Router();

guideImgRouter.get('/', guideImgController.show);

export default guideImgRouter;