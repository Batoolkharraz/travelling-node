import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const createHotelreStoreHotel=joi.object({
    name:joi.string().min(2).max(20).required(),
    description:joi.string().min(1).max(500).required(),
    rate:joi.number().positive().min(0).max(5),
}).required();

export const updateHotelreStoreHotel=joi.object({
    countryId:generalFeilds.id,
    name:joi.string().min(2).max(20),
    description:joi.string().min(1).max(500),
    rate:joi.number().positive().min(0).max(5),
}).required();

export const getHotelreStoreHotel = joi.object({
    countryId:generalFeilds.id,
}).required();

export const deleteHotelreStoreHotel = joi.object({
    countryId:generalFeilds.id,
}).required();

export const softDeleteHotelreStoreHotel = joi.object({
    countryId:generalFeilds.id,
}).required();

export const reStoreHotel = joi.object({
    countryId:generalFeilds.id,
}).required();
