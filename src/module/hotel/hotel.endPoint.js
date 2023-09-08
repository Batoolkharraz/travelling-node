import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    createHotel:[roles.superAdmin,roles.admin],
    updateHotel:[roles.superAdmin,roles.admin],
    getHotel:[roles.superAdmin,roles.admin,roles.user],
    getAllHotel:[roles.superAdmin,roles.admin,roles.user],
    deleteHotel:[roles.superAdmin,roles.admin],
    softDeleteHotel:[roles.superAdmin,roles.admin],
    reStoreHotel:[roles.superAdmin,roles.admin],
}