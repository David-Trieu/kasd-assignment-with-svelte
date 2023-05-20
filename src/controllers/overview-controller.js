export const overviewController = {
    overview:{
        auth: false,
        handler: function (request, h) {
            return h.view("overview", { title: "You are logged in" });
        },
    },
};
