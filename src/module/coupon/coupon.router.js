import { Router } from "express";
import * as couponCont from './controller/coupon.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./coupon.validation.js"
import { endPoint } from "./coupon.endPoint.js";
import auth from "../../MiddleWare/auth.middleware.js";

const router = Router();


router.post('/',auth(endPoint.createCoupon),validation(validators.createCoupon),couponCont.createCoupon);
router.patch('/update/:couponId',auth(endPoint.updateCoupon),validation(validators.updateCoupon),couponCont.updateCoupon)
router.get('/',couponCont.getAllCoupon)
router.get('/:couponId',auth(endPoint.getCoupon),validation(validators.getCoupon),couponCont.getCoupon);
router.delete('/:couponId',auth(endPoint.deleteCoupon),validation(validators.deleteCoupon),couponCont.deleteCoupon);
export default router;