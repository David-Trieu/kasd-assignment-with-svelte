export const overviewController = {
    index: {
        handler: async function (request, h) {
            return h.view("main");
        },
    },
};
