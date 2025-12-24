/**
 * @file routes/user/search.router.js
 * @description 검색 관련 라우터
 * 251219 v1.0.0 N init
 */

import express from 'express';
// ===== validators
import locationValidator from '../../app/middlewares/validations/validators/search/location.validator.js';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import searchController from '../../app/controllers/user/search.controller.js'

const userSearchRouter = express.Router();

userSearchRouter.get('/location', locationValidator, validationHandler, searchController.location);

export default userSearchRouter;