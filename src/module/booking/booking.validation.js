import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const makeBooking=joi.object({
    tripId:generalFeilds.id,
}).required();

export const cancleBooking=joi.object({
    tripId:generalFeilds.id,
}).required();

export const getBooking = joi.object({
    bookingId:generalFeilds.id,
}).required();
