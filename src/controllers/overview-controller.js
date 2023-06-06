export const overviewController = {
    overview:{
        handler: function (request, h) {
            return h.view("overview", { title: "You are logged in" });
        },
    },
};
