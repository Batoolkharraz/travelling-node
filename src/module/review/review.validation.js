import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const createReview=joi.object({
    tripId:generalFeilds.id,
    comment:joi.string().min(2).max(200),
    rating:joi.number().positive().min(0).max(5),
}).required();

export const updateReview=joi.object({
    reviewId:generalFeilds.id,
    comment:joi.string().min(2).max(200),
    rating:joi.number().positive().min(0).max(5),
}).required();

export const getReview=joi.object({
    reviewId:generalFeilds.id,
}).required();

export const deleteReview=joi.object({
    reviewId:generalFeilds.id,
}).required();
