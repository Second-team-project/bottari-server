/**
 * @file routes/store.router.js
 * @description 보관소 관련 라우터
 * 251228 v1.0.0 N init
 */

import express from 'express';
// ===== validators
// ===== controllers
import storeController from '../app/controllers/store.controller.js';

const storeRouter = express.Router();

storeRouter.get('/', storeController.show);

export default storeRouter;