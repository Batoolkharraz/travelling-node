import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    createCountry:[roles.superAdmin,roles.admin],
    updateCountry:[roles.superAdmin,roles.admin],
    getCountry:[roles.superAdmin,roles.admin,roles.user],
    getAllCountry:[roles.superAdmin,roles.admin,roles.user],
    deleteCountry:[roles.superAdmin,roles.admin],
    softDeleteCountry:[roles.superAdmin,roles.admin],
    reStoreCountry:[roles.superAdmin,roles.admin],
}