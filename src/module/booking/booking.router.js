import { Router } from "express";
import * as bookingCont from './controller/booking.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./booking.validation.js";
import { endPoint } from "./booking.endPoint.js";
import auth from "../../MiddleWare/auth.middleware.js";

const router = Router();


router.post('/:tripId',auth(endPoint.makeBooking),validation(validators.makeBooking),bookingCont.makeBooking);

router.patch('/cancleBooking/:tripId',auth(endPoint.cancleBooking),validation(validators.cancleBooking),bookingCont.cancleBooking)
router.get('/',auth(endPoint.getBooking),bookingCont.getAllBooking)
router.get('/:bookingId',auth(endPoint.getBooking),validation(validators.getBooking),bookingCont.getBooking);

export default router;