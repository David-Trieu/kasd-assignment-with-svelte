import Hapi from "@hapi/hapi";
import Handlebars from "handlebars";
import path from "path";
import {webRoutes} from "./web-routes.js"
import { fileURLToPath } from "url";
import Vision from "@hapi/vision";
import {db} from "./model/db.js";
import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function init() {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        routes: { cors: true },
    });

    console.log("Server started")
    await server.register(Vision);

    server.views({
        engines: {
            hbs: Handlebars,
        },
        relativeTo: __dirname,
        path: "./pages",
        layoutPath: "./pages",
        partialsPath: "./pages/components",
        layout: true,
        isCached: false,
    });
    db.init()
    server.route(webRoutes);
    await server.start();
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});
init();