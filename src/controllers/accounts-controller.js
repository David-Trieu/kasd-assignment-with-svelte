import {db} from "../model/db.js";
import {UserCredentialsSpec, UserSpec} from "../model/joi-schemas.js";

export const accountsController = {

    index: {
        auth: false,
        handler: function (request, h) {
            return h.view("main", { title: "Welcome" });
        },
    },
    showSignup: {
        auth: false,
        handler: function (request, h) {
            return h.view("signup-page", { title: "Sign up" });
        },
    },
    showLogin: {
        auth: false,
        handler: function (request, h) {
            return h.view("login-page", { title: "Login" });
        },
    },
    signup:{
        auth:false,
        validate: {
            payload: UserSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("signup-page", { title: "Sign up error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const user = request.payload;
            await db.userStore.addNewUser(user);
            return h.redirect("/");

        },
    },
    login:{
        auth:false,
        validate: {
            payload: UserCredentialsSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("login-page", { title: "Log in error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const { email, password } = request.payload;
            const user = await db.userStore.getUserByEmail(email);
            if (!user || user.password !== password) {
                return h.redirect("/");
            }
            request.cookieAuth.set({ id: user._id });
            return h.redirect("/overview");
        },
    },
    logout: {
        handler: function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },

    async validate(request, session) {
        const user = await db.userStore.getUserById(session.id);
        if (!user) {
            return { isValid: false };
        }
        return { isValid: true, credentials: user };
    },

}