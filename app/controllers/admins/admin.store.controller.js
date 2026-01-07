/**
 * @file app/controllers/admins/admin.store.controller.js
 * @description 보관소 관련 컨트롤러
 * 20251224 N init
 */


import { SUCCESS } from "../../../configs/responseCode.config.js";
import customResponse from "../../utils/custom.response.util.js";
// ===== services
import storeService from "../../services/admins/admin.store.service.js";

/**
 * 보관소 정보 모두 가져오기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function index(req, res, next) {
  try {
    const result = await storeService.index();

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 보관소 생성하기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function store(req, res, next) {
  try {
    const { storeName, code, addr, tel } = req.body;

    const result = await storeService.store({ storeName, code, addr, tel });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 보관소 수정하기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function update(req, res, next) {
  try {
    const id = req.params.id;
    const { storeName, addr, tel } = req.body;

    const result = await storeService.update({ id, storeName, addr, tel });

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

/**
 * 보관소 삭제하기
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function destroy(req, res, next) {
  try {
    const id = req.params.id;

    const result = await storeService.destroy(id);

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, result))
  } catch (error) {
    return next(error)
  }
}

export default {
  index,
  store,
  update,
  destroy,
}