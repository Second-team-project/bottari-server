/**
 * @file routes/user/review.router.js
 * @description 후기 관련 라우터
 * 251231 v1.0.0 N init
 */

import express from 'express';
// ===== validators
import indexValidator from '../../app/middlewares/validations/validators/review/index.validator.js';
import showValidator from "../../app/middlewares/validations/validators/review/show.validator.js"
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import reveiwController from "../../app/controllers/user/review.controller.js"

const userReviewRouter = express.Router();

userReviewRouter.get('/', indexValidator, validationHandler, reveiwController.index);
userReviewRouter.get('/:id', showValidator, validationHandler, reveiwController.show);

export default userReviewRouter;