import Server from "./provider/Server";
import express from "express";
import cors from "cors";
import { PORT,NODE_ENV } from "./config";

//Importar controladores
import EstudioController from "./controllers/EstudioController";

const server = new Server({
    env: NODE_ENV,
    port: PORT,    
    middlewares: [
        express.json(),
        express.urlencoded({ extended: true }),
        cors()
    ],
    controllers:[EstudioController.instance]
});

server.init();