import express,{Request, Response} from 'express';
//Importar controlador abstracto
import AbstractController from '../controllers/AbstractController';

class Server{
    //Atributos de instancia

    private app: express.Application;
    private port: number;
    private env: string;

    //Metodo constructor
    constructor(appInit:{port:number;env:string;middlewares:any[];controllers:AbstractController[]}){
        this.app = express();
        this.port = appInit.port;
        this.env = appInit.env;
        this.initMiddlewares(appInit.middlewares);
        this.initControllers(appInit.controllers);
    }

    private initMiddlewares(middlewares:any[]){
        //Recorrer middlewares
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }
    private initControllers(controllers:AbstractController[]){
        //Recorrer controladores
        controllers.forEach(controller => {
            this.app.use(`/${controller.prefix}`, controller.router);
        });
    }
}