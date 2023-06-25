import {db} from "../model/db.js";
import Boom from "@hapi/boom";
import {imageStore} from "../model/image-store.js";

export const imageApi = {
    find: {
        auth: false,
        handler: async function(request, h) {
            try {
                const images = await imageStore.getAllImages();
                return images;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],

    }
}