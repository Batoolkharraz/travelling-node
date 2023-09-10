import { Router } from "express";
import * as hotelCont from './controller/hotel.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./hotel.validation.js";
import { endPoint } from "./hotel.endPoint.js";
import auth from "../../MiddleWare/auth.middleware.js";

const router = Router();


router.post('/',auth(endPoint.createHotel),validation(validators.createHotel),hotelCont.createHotel);

router.patch('/updateHotel/:hotelId',auth(endPoint.updateHotel),validation(validators.updateHotel),hotelCont.updateHotel)

router.get('/',auth(endPoint.getAllHotel),hotelCont.getAllHotels)
router.get('/:hotelId',auth(endPoint.getHotel),validation(validators.getHotel),hotelCont.getHotel);

router.delete('/:hotelId',auth(endPoint.deleteHotel),validation(validators.deleteHotel),hotelCont.deleteHotel);
router.patch('/:hotelId',auth(endPoint.softDeleteHotel),validation(validators.softDeleteHotel),hotelCont.softDeleteHotel);
router.patch('/reStoreHotel/:hotelId',auth(endPoint.reStoreHotel),validation(validators.reStoreHotel),hotelCont.reStoreHotel);

export default router;