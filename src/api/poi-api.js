import Boom from "@hapi/boom";
import { db } from "../model/db.js";

export const poiApi = {
    find: {
        auth: false,
        handler: async function(request, h) {
            try {
                const pois = await db.poiStore.getAllPOIs();
                return pois;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
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
    },

    create: {
        auth: false,
        handler: async function(request, h) {
            try {
                const poi = await db.poiStore.addPOI(request.params.id,request.payload);
                if (poi) {
                    return h.response(poi).code(201);
                }
                return Boom.badImplementation("error creating poi");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    deleteAll: {
        auth: false,
        handler: async function(request, h) {
            try {
                await db.poiStore.deleteAllPOIs();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};
