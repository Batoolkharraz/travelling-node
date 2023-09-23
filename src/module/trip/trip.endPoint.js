import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    createTrip:[roles.superAdmin,roles.admin],
    updateTrip:[roles.superAdmin,roles.admin],
    getTrip:[roles.superAdmin,roles.admin,roles.user],
    getAllTrip:[roles.superAdmin,roles.admin,roles.user],
    deleteTrip:[roles.superAdmin,roles.admin],
    softDeleteTrip:[roles.superAdmin,roles.admin],
    reStoreTrip:[roles.superAdmin,roles.admin],
    searchTrip:[roles.superAdmin,roles.admin,roles.user],
}