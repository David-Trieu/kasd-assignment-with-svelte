import Hapi from "@hapi/hapi";
import Handlebars from "handlebars";
import path from "path";
import {webRoutes} from "./web-routes.js"
import { fileURLToPath } from "url";
import Vision from "@hapi/vision";
import {db} from "./model/db.js";
import * as dotenv from "dotenv";
import {apiRoutes} from "./api-routes.js"
import Cookie from "@hapi/cookie";
import {accountsController} from "./controllers/accounts-controller.js";

;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}

async function init() {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        routes: { cors: true },
    });

    console.log("Server started")
    await server.register(Vision);
    await server.register(Cookie);

    server.auth.strategy("session", "cookie", {
        cookie: {
            name: process.env.COOKIE_NAME,
            password: process.env.COOKIE_PASSWORD,
            isSecure: false,
        },
        redirectTo: "/",
        validate: accountsController.validate,
    });
    server.auth.default("session");

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
    server.route(apiRoutes)
    await server.start();
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});
init();