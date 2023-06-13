import {db} from "../model/db.js";
import {POILocationSpec, POISpec,} from "../model/joi-schemas.js";


export const overviewController = {
    index:{
        handler: async function (request, h) {
            const showpois = await db.poiStore.getAllPOIs();

            const viewData={
                title: "You are logged in",
                poi: showpois,
            }
            return h.view("overview", viewData);

        },
    },
    addPOI:{
        validate: {
            payload: POILocationSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("overview", { title: "Something went wrong, try again", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const  loggedInUser = request.auth.credentials;
            const newPOI = {
                createdBy: loggedInUser._id,
                name: request.payload.name,
                description: request.payload.description,
                location: {
                    latitude: request.payload.latitude,
                    longitude: request.payload.longitude,
                }
            }
            await db.poiStore.addPOI(loggedInUser._id,newPOI);
            return h.redirect("/overview")

        },
    },
    deletePOI:{
        handler: async function (request, h){
            const  loggedInUser = request.auth.credentials;
            const user = await db.userStore.getUserById(loggedInUser._id);
            const POI = await db.poiStore.getPOIById(request.params.id);
            if(user.hasAdminRights){
                await db.poiStore.deletePOIById(POI._id);
                return h.redirect("/overview");
            }
            return h.redirect("/overview");
        }
    }
};
