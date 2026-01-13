/**
 * @file routes/user/review.router.js
 * @description 후기 관련 라우터
 * 251231 v1.0.0 N init
 */

import express from 'express';
// ========================
// ||     middleware     ||
// ===== validators
import indexValidator from '../../app/middlewares/validations/validators/review/index.validator.js';
import createValidator from '../../app/middlewares/validations/validators/review/create.validator.js';
import destroyValidator from '../../app/middlewares/validations/validators/review/destory.validator.js'
import validationHandler from '../../app/middlewares/validations/validation.handler.js';

import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
import multerMiddleware from '../../app/middlewares/multer/multer.middleware.js';
// ===== controllers
import reveiwController from "../../app/controllers/user/review.controller.js"

const userReviewRouter = express.Router();

userReviewRouter.get('/', indexValidator, validationHandler, reveiwController.index);
userReviewRouter.get('/reviewable', authMiddleware, reveiwController.reviewable);
userReviewRouter.post('/', authMiddleware, multerMiddleware.reviewUploader, createValidator, validationHandler, reveiwController.create);
userReviewRouter.delete('/:id', authMiddleware, destroyValidator, validationHandler, reveiwController.destroy);

export default userReviewRouter;