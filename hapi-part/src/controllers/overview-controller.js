import {db} from "../model/db.js";
import {POILocationSpec, POISpec,} from "../model/joi-schemas.js";


export const overviewController = {
    index:{
        handler: async function (request, h) {
            const showpois = await db.poiStore.getAllPOIs();
            const categories = await db.categoryStore.getAllCategories();
            const viewData={
                title: "Placemark",
                poi: showpois,
                category: categories
            }
            return h.view("overview", viewData);

        },
    },
    getPOIByCategory:{
        handler: async function (request, h) {
            const showpois = await db.poiStore.getPOIByCategoryId(request.params.id);
            const viewData={
                poi: showpois,
            }
            return h.view("poi-by-category-page", viewData);

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
            const category = await db.categoryStore.getCategoryById(request.payload.category);
            const newPOI = {
                createdBy: loggedInUser._id,
                name: request.payload.name,
                description: request.payload.description,
                location: {
                    latitude: request.payload.latitude,
                    longitude: request.payload.longitude,
                },
                categoryId: category._id,
                categoryName: category.name,
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
            if(user.hasAdminRights||user._id == POI.createdBy){
                await db.poiStore.deletePOIById(POI._id);
                return h.redirect("/overview");
            }
            return h.redirect("/overview");
        }
    },
    alterPOI:{
        handler: async function (request, h){
            const loggedInUser = request.auth.credentials;
            const POI = await db.poiStore.getPOIById(request.params.id);
            const category = await db.categoryStore.getCategoryById(request.payload.category);
            const newPOI = {
                createdBy: loggedInUser._id,
                name: request.payload.name,
                description: request.payload.description,
                location: {
                    latitude: request.payload.latitude,
                    longitude: request.payload.longitude,
                },
                categoryId: category._id,
                categoryName: category.name,
                img: POI.img
            }
            if(loggedInUser.hasAdminRights || loggedInUser._id === POI.createdBy){
                await db.poiStore.updatePOI(POI, newPOI);
                return h.redirect(`/poi/${POI._id}`);
            }
            return h.redirect(`/poi/${POI._id}`);
        }
    }
};
