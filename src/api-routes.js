import { poiApi } from "./api/poi-api.js";
import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

    { method: "GET", path: "/api/pois", config: poiApi.find },
    { method: "POST", path: "/api/users/{id}/pois", config: poiApi.create },
    { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
    { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },

    { method: "GET", path: "/api/categories", config: categoryApi.find },
    { method: "POST", path: "/api/users/{id}/categories", config: categoryApi.create },
    { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
    { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
];