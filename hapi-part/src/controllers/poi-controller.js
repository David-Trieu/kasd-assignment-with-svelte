import { imageStore } from "../model/image-store.js";
import {db} from "../model/db.js";

export const poiController = {
    index:{
        handler: async function (request, h) {
            const showpoi = await db.poiStore.getPOIById(request.params.id);
            const categories = await db.categoryStore.getAllCategories();
            const viewData={
                title: "You are logged in",
                poi: showpoi,
                category: categories
            }
            return h.view("poi-page", viewData);

        },
    },
    uploadImage: {
        handler: async function (request, h) {
            try {
                const oldpoi = await db.poiStore.getPOIById(request.params.id);
                const poi = await db.poiStore.getPOIById(request.params.id);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(request.payload.imagefile);
                    poi.img.push(url);
                    await db.poiStore.updatePOI(oldpoi,poi);
                }
                return h.redirect(`/poi/${poi._id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/poi/${request.params.id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
    deleteImage: {
        handler: async function (request,h) {
            const loggedInUser = request.auth.credentials;
            const poi = await db.poiStore.getPOIById(request.params.id);
            const oldpoi = await db.poiStore.getPOIById(request.params.id);
            if(loggedInUser.hasAdminRights || loggedInUser._id === poi.createdBy){
                await imageStore.deleteImage(poi.img);
                poi.img = "";
                await db.poiStore.updatePOI(oldpoi,poi);
                return h.redirect(`/poi/${poi._id}`);
            }
            return h.redirect(`/poi/${request.params.id}`);
        }
    }
}

