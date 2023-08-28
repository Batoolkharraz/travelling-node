import { Router } from "express";
import * as couponCont from './controller/coupon.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./coupon.validation.js"

const router = Router();


router.post('/',validation(validators.createCoupon),couponCont.createCoupon);
router.put('/update/:couponId',validation(validators.updateCoupon),couponCont.updateCoupon)
router.get('/',couponCont.getAllCoupon)
router.get('/:couponId',validation(validators.getCoupon),couponCont.getCoupon);
export default router;