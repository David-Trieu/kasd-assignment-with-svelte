import Boom from "@hapi/boom";
import { db } from "../model/db.js";

export const categoryApi = {
    find: {
        auth: false,
        handler: async function(request, h) {
            try {
                const categories = await db.categoryStore.getAllCategories();
                return categories;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all categories",
        notes: "Returns all categories",
    },

    findOne: {
        auth: false,
        handler: async function(request, h) {
            try {
                const category = await db.categoryStore.getCategoryById(request.params.id);
                if (!category) {
                    return Boom.notFound("No category with this id");
                }
                return category;
            } catch (err) {
                return Boom.serverUnavailable("No category with this id");
            }
        },
    },

    create: {
        auth: false,
        handler: async function(request, h) {
            try {
                const category = await db.categoryStore.addCategory(request.params.id, request.payload);
                if (category) {
                    return h.response(category).code(201);
                }
                return Boom.badImplementation("error creating category");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    deleteAll: {
        auth: false,
        handler: async function(request, h) {
            try {
                await db.categoryStore.deleteAllCategories();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};
