import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const createPayment=joi.object({
    tripId:generalFeilds.id.required(),
    couponName:joi.string().required(),
    address:joi.string().required(),
    phoneNumber:joi.string().required(),
    paymentMethod:joi.string().required(),
}).required();

export const updatePayment=joi.object({
    paymentId:generalFeilds.id,
    couponName:joi.string(),
    address:joi.string(),
    phoneNumber:joi.string(),
    paymentMethod:joi.string(),
}).required();

export const getPayment = joi.object({
    paymentId:generalFeilds.id,
}).required();

