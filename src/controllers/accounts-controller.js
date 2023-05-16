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
}