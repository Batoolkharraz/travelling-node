import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const createCountry=joi.object({
    name:joi.string().min(2).max(20).required(),
    description:joi.string().min(1).max(500).required(),
}).required();

export const updateCountry=joi.object({
    countryId:generalFeilds.id,
    name:joi.string().min(2).max(20),
    description:joi.string().min(1).max(500),
}).required();

export const getCountry = joi.object({
    countryId:generalFeilds.id,
}).required();

export const deleteCountry = joi.object({
    countryId:generalFeilds.id,
}).required();

export const softDeleteCountry = joi.object({
    countryId:generalFeilds.id,
}).required();

export const reStoreCountry = joi.object({
    countryId:generalFeilds.id,
}).required();
