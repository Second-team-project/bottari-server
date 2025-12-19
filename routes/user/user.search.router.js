/**
 * @file routes/user/search.router.js
 * @description 검색 관련 라우터
 * 251219 v1.0.0 N init
 */

import express from 'express';

import searchController from '../../app/controllers/user/search.controller.js'

const userSearchRouter = express.Router();

userSearchRouter.get('/location', searchController.location);

export default userSearchRouter;