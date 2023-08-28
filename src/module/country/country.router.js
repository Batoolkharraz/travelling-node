import { Router } from "express";
import * as countryCont from './controller/country.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./country.validation.js";
import { endPoint } from "./country.endPoint.js";
import auth from "../../MiddleWare/auth.middleware.js";

const router = Router();


router.post('/',auth(endPoint.createCountry),validation(validators.createCountry),countryCont.createCountry);
router.patch('/updateCountry/:countryId',auth(endPoint.updateCountry),validation(validators.updateCountry),countryCont.updateCountry)
router.get('/',auth(endPoint.getAllCountry),countryCont.getAllCountry)
router.get('/:countryId',auth(endPoint.getCountry),validation(validators.getCountry),countryCont.getCountry);

router.delete('/:countryId',auth(endPoint.deleteCountry),validation(validators.deleteCountry),countryCont.deleteCountry);
router.patch('/:countryId',auth(endPoint.softDeleteCountry),validation(validators.softDeleteCountry),countryCont.softDeleteCountry);
router.patch('/reStoreCountry/:countryId',auth(endPoint.reStoreCountry),validation(validators.reStoreCountry),countryCont.reStoreCountry);
export default router;