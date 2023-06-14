import {db} from "../model/db.js";

export const adminController = {
    index: {
        handler: async function (request, h) {
            const loggedinuser = request.auth.credentials;
            const users =  await db.userStore.getAllUsers();
            const viewData={
                title: "Adminpage",
                user: users,
            }
            if(loggedinuser.hasAdminRights){
                return h.view("admin-page", viewData);
            }
            return h.redirect("/overview")

        },
    },
    deleteUser:{
        handler: async function (request, h) {

            await db.userStore.deleteUserById(request.params.id);
            return h.redirect("/admin");
        },
    }
}