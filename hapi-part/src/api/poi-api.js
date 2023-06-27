import Boom from "@hapi/boom";
import { db } from "../model/db.js";
import { EventEmitter } from "events";
import {IdSpec, POISpecPlusLocation,} from "../model/joi-schemas.js";
import {validationError} from "./logger.js";
EventEmitter.setMaxListeners(30);


export const poiApi = {

    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function(request, h) {
            try {
                const pois = await db.poiStore.getAllPOIs();
                return pois;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all points of interest",
        notes: "Returns all points of interest",
    },

    findOne: {
        auth: false,
        handler: async function(request, h) {
            try {
                const poi = await db.poiStore.getPOIById(request.params.id);
                if (!poi) {
                    return Boom.notFound("No poi with this id");
                }
                return poi;
            } catch (err) {
                return Boom.serverUnavailable("No poi with this id");
            }
        },
        tags: ["api"],
        description: "Get one point of interest",
        notes: "Returns one point of interest",
        validate: { params: { id: IdSpec }, failAction: validationError },
        //response: { schema: POISpecPlusLocation, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function(request, h) {
            try {
                const userid = request.auth.credentials._id;
                const poi = await db.poiStore.addPOI(userid, request.payload);
                if (poi) {
                    return h.response(poi).code(201);
                }
                return Boom.badImplementation("error creating poi");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a point of interest",
        notes: "Returns the newly created point of interest",
        validate: { payload: POISpecPlusLocation, failAction: validationError },
        response: { schema: POISpecPlusLocation, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function(request, h) {
            try {
                await db.poiStore.deleteAllPOIs();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all points of interest",
    },
    deleteOne:{
        auth: {
            strategy: "jwt",
        },
        handler: async function(request, h) {
            try {
                const loggedInUser = request.auth.credentials
                const poi = await db.poiStore.getPOIById(request.params.id);
                if (loggedInUser.hasAdminRights || poi.createdBy.equals(loggedInUser._id)) {
                    await db.poiStore.deletePOIById(poi._id);
                    return h.response().code(204);
                }
            } catch (err) {
                return Boom.serverUnavailable(err);
            }
        },
        tags: ["api"],
        description: "Delete one point of interest",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },
    updatePOI: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const newPOI = request.payload;
                const poi = await db.poiStore.getPOIById(request.params.id);
                if (loggedInUser.hasAdminRights || poi.createdBy.equals(loggedInUser._id)) {
                    await db.poiStore.updatePOI(poi, newPOI);
                    return true;
                }
                return false;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    },


};
