import {overviewController} from "./controllers/overview-controller.js";
import {accountsController} from "./controllers/accounts-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },

    { method: "GET", path: "/overview", config: overviewController.index },
    { method: "POST", path: "/overview/addpoi", config: overviewController.addPOI },
    { method: "GET", path: "/overview/deletepoi/{id}", config: overviewController.deletePOI },





    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

]

