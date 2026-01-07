/**
 * @file routes/admin/guide.router.js
 * @description 보관소 관련 라우터
 * 250101 v1.0.0 N init
 */

import express from 'express';
// ===== middlewares
import multerMiddleware from '../../app/middlewares/multer/multer.middleware.js';
// === validators
import { storeValidator, updateValidator, updateOrderValidator, destroyValidator } from '../../app/middlewares/validations/validators/guideImg/guideImg.validator.js'
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
// ===== controllers
import guideImgController from '../../app/controllers/admins/admin.guideImg.controller.js';

const guideImgRouter = express.Router();

guideImgRouter.get('/', guideImgController.index);
guideImgRouter.post('/', multerMiddleware.guideUploader, storeValidator, validationHandler, guideImgController.store);
guideImgRouter.put('/:id', multerMiddleware.guideUploader, updateValidator, validationHandler, guideImgController.update);
guideImgRouter.patch('/:id', updateOrderValidator, validationHandler, guideImgController.updateOrder);
guideImgRouter.delete('/:id', destroyValidator, validationHandler, guideImgController.destroy);

export default guideImgRouter;