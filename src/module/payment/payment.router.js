import { Router } from "express";
import * as paymentCont from './controller/payment.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./payment.validation.js";
import { endPoint } from "./payment.endPoint.js";
import auth from "../../MiddleWare/auth.middleware.js";

const router = Router();


router.post('/:tripId',auth(endPoint.createPayment),validation(validators.createPayment),paymentCont.createPayment);

router.patch('/updatePayment/:paymentId',auth(endPoint.updatePayment),validation(validators.updatePayment),paymentCont.updatePayment)

router.get('/',auth(endPoint.getPayment),paymentCont.getAllPayments)
router.get('/:paymentId',auth(endPoint.getPayment),validation(validators.getPayment),paymentCont.getPayment);

export default router;