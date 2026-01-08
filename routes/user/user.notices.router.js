/**
 * @file routes/user/user.notices.router.js
 * @description 공지사항 관련 라우터
 * 260108 v1.0.0 N init
 */

import express from 'express';
import noticesController from '../../app/controllers/user/user.notices.controller.js';

const userNoticesRouter = express.Router();

userNoticesRouter.get('/', noticesController.index);
userNoticesRouter.get('/:id', noticesController.show);

export default userNoticesRouter;