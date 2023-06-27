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

    },
    uploadImage: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const poi = await db.poiStore.getPOIById(request.params.id);
                const file = Object.values(request.payload)[0];
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(file);
                    await db.poiStore.uploadImage(poi, url);
                }
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
    deleteImage:{
        auth:  {
            strategy: "jwt",
        },
        handler: async function(request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const poi = await db.poiStore.getPOIById(request.params.id);
                if (loggedInUser.hasAdminRights || poi.createdBy.equals(loggedInUser._id))
                {
                    for (let url of poi.img) {
                        await imageStore.deleteImage(url);
                    }
                    await db.poiStore.deleteImage(poi);
                    return true;
                }
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    }

}