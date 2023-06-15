import {db} from "../model/db.js";

export const categoryController = {
    index: {
        handler: async function (request, h) {
            const Categories =  await db.categoryStore.getAllCategories()
            const viewData={
                title: "Categories",
                category: Categories,
            }

            return h.view("category-page", viewData)

        },
    },
    addCategory:{
        handler: async function (request, h) {
            const loggedinUser = request.auth.credentials;
            if(loggedinUser.hasAdminRights){
                const newCategory = {
                    name: request.payload.name,
                }
                await db.categoryStore.addCategory(loggedinUser._id, newCategory)
                return h.redirect("/category");
            }
            return h.redirect("/category");

        },
    },
    deleteCategory:{
        handler: async function (request, h) {
            const loggedinUser = request.auth.credentials;
            if(loggedinUser.hasAdminRights){
                await db.categoryStore.deleteCategoryById(request.params.id);
                return h.redirect("/category");
            }
            return h.redirect("/category");

        },
    },
}