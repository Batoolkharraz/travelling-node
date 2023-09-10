import { Router } from "express";
import * as tripCont from './controller/trip.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./trip.validation.js";
import { endPoint } from "./trip.endPoint.js";
import auth from "../../MiddleWare/auth.middleware.js";

const router = Router();

/*
router.post('/',auth(endPoint.createCountry),validation(validators.createCountry),countryCont.createCountry);
router.patch('/updateCountry/:countryId',auth(endPoint.updateCountry),validation(validators.updateCountry),countryCont.updateCountry)
router.get('/',auth(endPoint.getAllCountry),countryCont.getAllCountry)
router.get('/:countryId',auth(endPoint.getCountry),validation(validators.getCountry),countryCont.getCountry);

router.delete('/:countryId',auth(endPoint.deleteCountry),validation(validators.deleteCountry),countryCont.deleteCountry);
router.patch('/:countryId',auth(endPoint.softDeleteCountry),validation(validators.softDeleteCountry),countryCont.softDeleteCountry);
router.patch('/reStoreCountry/:countryId',auth(endPoint.reStoreCountry),validation(validators.reStoreCountry),countryCont.reStoreCountry);
*/
export default router;