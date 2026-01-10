/**
 * @file routes/user/user.notices.router.js
 * @description 공지사항 관련 라우터
 * 260108 v1.0.0 N init
 */

import express from 'express';
import showValidator from '../../app/middlewares/validations/validators/notices/show.validator.js';

import noticesController from '../../app/controllers/user/user.notices.controller.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';

const userNoticesRouter = express.Router();

userNoticesRouter.get('/', noticesController.index);
userNoticesRouter.get('/:id', showValidator, validationHandler, noticesController.show);

export default userNoticesRouter;