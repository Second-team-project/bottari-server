/**
 * @file routes/admin/guide.router.js
 * @description 보관소 관련 라우터
 * 250101 v1.0.0 N init
 */

import express from 'express';
// ===== middlewares
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
import multerMiddleware from '../../app/middlewares/multer/multer.middleware.js';
// === validators
import { storeValidator, updateValidator, updateOrderValidator, destroyValidator } from '../../app/middlewares/validations/validators/guideImg/guideImg.validator.js'
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import adminGuideImgController from '../../app/controllers/admins/admin.guideImg.controller.js';

const adminGuideImgRouter = express.Router();

adminGuideImgRouter.get('/', authMiddleware, adminGuideImgController.index);
adminGuideImgRouter.post('/', authMiddleware, multerMiddleware.guideUploader, storeValidator, validationHandler, adminGuideImgController.store);
adminGuideImgRouter.put('/:id', authMiddleware, multerMiddleware.guideUploader, updateValidator, validationHandler, adminGuideImgController.update);
adminGuideImgRouter.patch('/:id', authMiddleware, updateOrderValidator, validationHandler, adminGuideImgController.updateOrder);
adminGuideImgRouter.delete('/:id', authMiddleware, destroyValidator, validationHandler, adminGuideImgController.destroy);

export default adminGuideImgRouter;