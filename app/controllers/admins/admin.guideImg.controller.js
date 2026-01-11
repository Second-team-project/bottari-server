/**
 * @file app/controllers/admin/admin.guideImg.controller.js
 * @description 가이드이미지 관련 컨트롤러
 * 20260107 N init
 */

import { BAD_REQUEST_ERROR, SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
import customError from "../../errors/custom.error.js";
// ===== services
import guideImgService from "../../services/admins/admin.guideImg.service.js";

/**
 * 이미지 전체 불러오기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function index(req, res, next) {
  try {
    const result = await guideImgService.index();

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 이미지 추가하기 (FormData)
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function store(req, res, next) {
  try {
    const data = req.body;
    const file = req.file;

    const sendData = {
      title: data?.title || null,
      type: data?.type,
      img: file ? `${process.env.APP_URL}${process.env.ACCESS_FILE_GUIDE_IMAGE_PATH}/${req.file.filename}` : null,
      imgEng: null,
      active: data?.active || 'T',
      link: data?.link || null
    }
    const result = await guideImgService.store(sendData);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 이미지 수정하기 (FormData)
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function update(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const file = req.file;

    const sendData = {
      id,
      title: data?.title,
      type: data?.type,
      img: file ? `${process.env.APP_URL}${process.env.ACCESS_FILE_GUIDE_IMAGE_PATH}/${file.filename}` : undefined,
      imgEng: data?.imgEng,
      active: data?.active,
      link: data?.link
    };
    const result = await guideImgService.update(sendData);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 이미지 순서 수정하기 (JSON)
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function updateOrder(req, res, next) {
  try {
    const { id } = req.params;
    const { sortOrder } = req.body;
    // service.upadte 대응 (sortOrder가 없어도 변경 없이 성공 처리 됨)
    if (sortOrder === undefined) {
      return next(customError('sortOrder는 필수입니다.', BAD_REQUEST_ERROR));
    }

    const result = await guideImgService.update({ id, sortOrder });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 이미지 삭제하기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function destroy(req, res, next) {
  try {
    const { id } = req.params;
    const result = await guideImgService.destroy(id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  index,
  store,
  update,
  updateOrder,
  destroy,
}