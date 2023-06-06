import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
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
import HapiSwagger from "hapi-swagger";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import { validate } from "./api/jwt-utils.js";

const swaggerOptions = {
    info: {
        title: "Placemark API",
        version: "0.1",
    },
};


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
    await server.register(jwt);
    await server.register(Inert);
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    server.validator(Joi);

    server.auth.strategy("session", "cookie", {
        cookie: {
            name: process.env.COOKIE_NAME,
            password: process.env.COOKIE_PASSWORD,
            isSecure: false,
        },
        redirectTo: "/",
        validate: accountsController.validate,
    });
    server.auth.strategy("jwt", "jwt", {
        key: process.env.cookie_password,
        validate: validate,
        verifyOptions: { algorithms: ["HS256"] }
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