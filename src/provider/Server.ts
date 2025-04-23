import express,{Request, Response} from 'express';
//Importar controlador abstracto
import AbstractController from '../controllers/AbstractController';
import db from '../models';

export default class Server{
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
        this.connectDB();
    }

    private initMiddlewares(middlewares:any[]){
        //Recorrer middlewares
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }
    private initControllers(controllers:AbstractController[]){
        this.app.get('/', (req:Request, res:Response) => {
            res.send('Server is runnning 🚀');
        });
        //Recorrer controladores
        controllers.forEach(controller => {
            this.app.use(`/${controller.prefix}`, controller.router);
        });
    }

    // JS y TS Manejan promesas de forma diferente por lo que necesitamos obligar a TS a que espere
    private async connectDB(){
        try {
            await db.sequelize.sync({force:false}); // force:true para crear la base de datos desde cero
            console.log('Database connected');
        }catch{
            console.log('Error connecting to database');
        }
    }

    public init():void{
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port} in ${this.env} mode`);
        });
    }
}