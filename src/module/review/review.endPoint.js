import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    create:[roles.admin],
    update:[roles.admin],
    get:[roles.user,roles.admin],
    cancel:[roles.user,roles.admin],
    updateStatus:[roles.admin]
}