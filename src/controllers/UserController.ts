import {Request, Response} from 'express';
import AbstractController from './AbstractController';
import User from '../modelsNOSQL/User';

class UserController extends AbstractController {
    //singleton 
    private static _instance: UserController;
    public static get instance(): UserController {
        return this._instance || (this._instance = new this("user"));
    }

    protected initRoutes(): void {
        this.router.post('/createUser',this.postCreateUser.bind(this));
        this.router.get('/listUser',this.getListUsers.bind(this));
    }

    private async postCreateUser(req: Request, res: Response): Promise<void> {
        try{
            console.log(req.body);
            await User.UserManager.put(new User(req.body));
            res.status(201).send('User created successfully');
        }catch (error) {    
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    private async getListUsers(req: Request, res: Response): Promise<void> {
        try {
            const users =  (await User.UserManager.scan().run({return:"output"})).Items;
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}
export default UserController;