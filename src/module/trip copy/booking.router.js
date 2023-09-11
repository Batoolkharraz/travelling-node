import { Router } from "express";
import * as tripCont from './controller/booking.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./booking.validation.js";
import { endPoint } from "./booking.endPoint.js";
import auth from "../../MiddleWare/auth.middleware.js";

const router = Router();


router.post('/',auth(endPoint.createTrip),validation(validators.createTrip),tripCont.createTrip);
router.patch('updateTrip/:tripId',auth(endPoint.updateTrip),validation(validators.updateTrip),tripCont.updateTrip)
router.get('/',auth(endPoint.getAllTrip),countryCont.getAllTrip)
router.get('/:tripId',auth(endPoint.getTrip),validation(validators.getTrip),tripCont.getTrip);

router.delete('/:tripId',auth(endPoint.deleteTrip),validation(validators.deleteTrip),tripCont.deleteTrip);
router.patch('/:tripId',auth(endPoint.softDeleteTrip),validation(validators.softDeleteTrip),tripCont.softDeleteTrip);
router.patch('/reStoreTrip/:tripId',auth(endPoint.reStoreTrip),validation(validators.reStoreTrip),tripCont.reStoreTrip);

export default router;