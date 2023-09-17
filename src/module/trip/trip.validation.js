import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const createTrip=joi.object({
    name:joi.string().min(2).max(20).required(),
    description:joi.string().min(1).max(500),
    capacity:joi.number().positive().required(),
    maxCapacity:joi.number().positive().required(),
    date:joi.date().required(),
    rate:joi.number().positive().min(0).max(5),
    country:joi.string().min(2).max(20).required(),
    hotel:joi.string().min(2).max(20).required(),
    price:joi.number().positive().required(),

}).required();

export const updateTrip=joi.object({
    tripId:generalFeilds.id,
    name:joi.string().min(2).max(20),
    description:joi.string().min(1).max(500),
    capacity:joi.number().positive(),
    maxCapacity:joi.number().positive(),
    date:joi.date(),
    rate:joi.number().positive().min(0).max(5),
    country:joi.string().min(2).max(20),
    hotel:joi.string().min(2).max(20),
    price:joi.number().positive(),
}).required();

export const getTrip = joi.object({
    tripId:generalFeilds.id,
}).required();

export const deleteTrip = joi.object({
    tripId:generalFeilds.id,
}).required();

export const softDeleteTrip = joi.object({
    tripId:generalFeilds.id,
}).required();

export const reStoreTrip = joi.object({
    tripId:generalFeilds.id,
}).required();
