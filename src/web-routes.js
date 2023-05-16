import {overviewController} from "./controllers/overview-controller.js";
import {accountsController} from "./controllers/accounts-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
]

