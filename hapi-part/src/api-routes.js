import { poiApi } from "./api/poi-api.js";
import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import {imageApi} from "./api/image-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/one", config: userApi.findOne },

    { method: "GET", path: "/api/pois", config: poiApi.find },
    { method: "POST", path: "/api/users/pois", config: poiApi.create },
    { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
    { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },
    { method: "DELETE", path: "/api/pois/{id}/delete", config: poiApi.deleteOne },
    { method: "POST", path: "/api/pois/{id}/update", config: poiApi.updatePOI },

    { method: "GET", path: "/api/images", config: imageApi.find},
    { method: "POST", path: "/api/images/{id}/upload", config: imageApi.uploadImage },
    { method: "DELETE", path: "/api/images/{id}/delete", config: imageApi.deleteImage },


    { method: "GET", path: "/api/categories", config: categoryApi.find },
    { method: "POST", path: "/api/users/{id}/categories", config: categoryApi.create },
    { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
    { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },


    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

];