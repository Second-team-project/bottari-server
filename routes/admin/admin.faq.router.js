/**
 * @file routes/admin/admin.FAQ.router.js
 * @description FAQ 라우터
 * 251222 v1.0.0 김민현 init
 */
import express from 'express';
import validationHandler from '../../app/middlewares/validations/validation.handler.js';
import authMiddleware from '../../app/middlewares/auth/auth.middleware.js';
import adminFAQController from '../../app/controllers/admins/admin.FAQ.controller.js';
import indexValidator from '../../app/middlewares/validations/validators/faq/index.validator.js';
import showValidator from '../../app/middlewares/validations/validators/faq/show.validator.js';
import storeValidator from '../../app/middlewares/validations/validators/faq/store.validator.js';
import updateValidator from '../../app/middlewares/validations/validators/faq/update.validator.js';
import destroyValidator from '../../app/middlewares/validations/validators/faq/destroy.validator.js';
import multerMiddleware from '../../app/middlewares/multer/multer.middleware.js';

const adminFAQRouter = express.Router();

adminFAQRouter.get('/', indexValidator, validationHandler, adminFAQController.index);
adminFAQRouter.get('/:id', authMiddleware, showValidator, validationHandler, adminFAQController.show);
adminFAQRouter.post('/', authMiddleware, multerMiddleware.faqUploader, storeValidator, validationHandler, adminFAQController.store);
adminFAQRouter.put('/:id', authMiddleware, multerMiddleware.faqUploader, updateValidator, validationHandler, adminFAQController.update);
adminFAQRouter.delete('/:id', authMiddleware, destroyValidator, validationHandler, adminFAQController.destroy);

export default adminFAQRouter;