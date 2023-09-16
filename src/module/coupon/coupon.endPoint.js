import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    createCoupon:[roles.superAdmin,roles.admin,roles.user],
    updateCoupon:[roles.superAdmin,roles.admin,roles.user],
    getCoupon:[roles.superAdmin,roles.admin,roles.user],
    deleteCoupon:[roles.superAdmin,roles.admin,roles.user],
}