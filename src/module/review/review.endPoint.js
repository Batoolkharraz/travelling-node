import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    createReview:[roles.superAdmin,roles.admin,roles.user],
    updateReview:[roles.superAdmin,roles.admin,roles.user],
    getReview:[roles.superAdmin,roles.admin,roles.user],
    deleteReview:[roles.superAdmin,roles.admin,roles.user],
}