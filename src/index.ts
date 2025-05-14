import Server from "./provider/Server";
import express from "express";
import cors from "cors";
import { PORT,NODE_ENV } from "./config";

//Importar controladores
import EstudioController from "./controllers/EstudioController";
import ProjectController from "./controllers/ProjectController";
import UserController from "./controllers/UserController";

const server = new Server({
    env: NODE_ENV,
    port: PORT,    
    middlewares: [
        express.json(),
        express.urlencoded({ extended: true }),
        cors()
    ],
    controllers:[
        EstudioController.instance,
        ProjectController.instance]
        //UserController.instance]
});

server.init();