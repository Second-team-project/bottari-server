/**
 * @file routes/user/review.router.js
 * @description 후기 관련 라우터
 * 251231 v1.0.0 N init
 */

import express from 'express';
// ===== validators
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers

const userReviewRouter = express.Router();

userReviewRouter.get('/', reveiwController.index);
userReviewRouter.get('/:id', reveiwController.show);

export default userReviewRouter;