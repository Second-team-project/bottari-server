/**
 * @file routes/user/user.FAQ.router.js
 * @description FAQ 라우터
 * 260108 v1.0.0 N init
 */
import express from 'express';
import faqController from '../../app/controllers/user/user.faq.controller.js';

const userFAQRouter = express.Router();

userFAQRouter.get('/', faqController.index);
userFAQRouter.get('/:id',  faqController.show);

export default userFAQRouter;