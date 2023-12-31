import { Router } from "express";
import * as tripCont from './controller/trip.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./trip.validation.js";
import { endPoint } from "./trip.endPoint.js";
import auth from "../../MiddleWare/auth.middleware.js";

const router = Router();


router.post('/',auth(endPoint.createTrip),validation(validators.createTrip),tripCont.createTrip);
router.patch('/updateTrip/:tripId',auth(endPoint.updateTrip),validation(validators.updateTrip),tripCont.updateTrip)
router.get('/',auth(endPoint.getAllTrip),tripCont.getAllTrip)
router.get('/:tripId',auth(endPoint.getTrip),validation(validators.getTrip),tripCont.getTrip);

router.delete('/:tripId',auth(endPoint.deleteTrip),validation(validators.deleteTrip),tripCont.deleteTrip);
router.patch('/:tripId',auth(endPoint.softDeleteTrip),validation(validators.softDeleteTrip),tripCont.softDeleteTrip);
router.patch('/reStoreTrip/:tripId',auth(endPoint.reStoreTrip),validation(validators.reStoreTrip),tripCont.reStoreTrip);

router.get('/searchTrip',auth(endPoint.searchTrip),tripCont.searchTripByCountry);
router.get('/searchTripByDate',auth(endPoint.searchTrip),validation(validators.searchTripByDate),tripCont.searchTripByDate);
router.get('/searchTripByPrice/:tripId',auth(endPoint.searchTrip),validation(validators.searchTripByPrice),tripCont.searchTripByPrice);
export default router;