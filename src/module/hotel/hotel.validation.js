import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const createHotel=joi.object({
    name:joi.string().min(2).max(20).required(),
    description:joi.string().min(1).max(500).required(),
    rate:joi.number().positive().min(0).max(5),
    country:joi.string().min(2).max(20).required(),
}).required();

export const updateHotel=joi.object({
    countryId:generalFeilds.id,
    name:joi.string().min(2).max(20),
    description:joi.string().min(1).max(500),
    rate:joi.number().positive().min(0).max(5),
}).required();

export const getHotel = joi.object({
    countryId:generalFeilds.id,
}).required();

export const deleteHotel = joi.object({
    countryId:generalFeilds.id,
}).required();

export const softDeleteHotel = joi.object({
    countryId:generalFeilds.id,
}).required();

export const reStoreHotel = joi.object({
    countryId:generalFeilds.id,
}).required();
