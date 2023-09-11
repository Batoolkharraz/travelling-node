import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    makeBooking:[roles.admin,roles.user],
    cancleBooking:[roles.admin,roles.user],
    getBooking:[roles.superAdmin,roles.admin,roles.user],
}