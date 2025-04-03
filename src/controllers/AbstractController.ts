import {Router} from 'express';

export default abstract class AbstractController {
    //Atributos de clase
    private _router: Router;
    private _prefix: string;

    public get router(): Router {
        return this._router;
    }
    public get prefix(): string {
        return this._prefix;
    }
    //Constructor
    protected constructor(_prefix: string) {
        this._prefix = _prefix;
        this._router = Router();
        this.initRoutes();
    }
    protected abstract initRoutes(): void;
}