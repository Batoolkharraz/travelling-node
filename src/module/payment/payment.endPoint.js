import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    createPayment:[roles.superAdmin,roles.admin],
    updatePayment:[roles.superAdmin,roles.admin],
    getPayment:[roles.superAdmin,roles.admin,roles.user],
}