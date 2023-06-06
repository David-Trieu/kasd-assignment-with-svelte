import {db} from "../model/db.js";


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
        handler: async function (request, h) {
            const  loggedInUser = request.auth.credentials;
            const newPOI = {
                createdBy: loggedInUser._id,
                name: request.payload.poiname,
                Description: request.payload.description,
                Location: {
                    latitude: request.payload.lat,
                    longitude: request.payload.long,
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
