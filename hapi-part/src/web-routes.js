import {overviewController} from "./controllers/overview-controller.js";
import {accountsController} from "./controllers/accounts-controller.js";
import {poiController} from "./controllers/poi-controller.js";
import {adminController} from "./controllers/admin-controller.js";
import {categoryController} from "./controllers/category-controller.js";

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
    { method: "POST", path: "/overview/alterpoi/{id}", config: overviewController.alterPOI },


    { method: "GET", path: "/poi/{id}", config: poiController.index },
    { method: "POST", path: "/poi/{id}/uploadimage", config: poiController.uploadImage },
    { method: "GET", path: "/poi/{id}/deleteimage", config: poiController.deleteImage },


    { method: "GET", path: "/admin", config: adminController.index },
    { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },

    { method: "GET", path: "/category", config: categoryController.index },
    { method: "GET", path: "/category/{id}", config: overviewController.getPOIByCategory },
    { method: "POST", path: "/category/addcategory", config: categoryController.addCategory },
    { method: "GET", path: "/category/deletecategory/{id}", config: categoryController.deleteCategory },

    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

]

