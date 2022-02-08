import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";
import User from "../models/User";

export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;
    public static getInstance = (app: Express): UserController => {
       if(UserController.userController === null) {
           UserController.userController = new UserController();
           
           // for testing without postman. Not RESTful
           app.get("/users/create", UserController.userController.createUser);
           app.get("/users/:uid/delete", UserController.userController.deleteUser);
           
           // RESTful User Web service API
           app.get("/users", UserController.userController.findAllUsers);
           app.get("/users/:uid", UserController.userController.findUserById);
           app.post("/users", UserController.userController.createUser);
           app.put("/users/:uid", UserController.userController.updateUser);
           app.delete("/users/:uid", UserController.userController.deleteUser);
       }
       return UserController.userController;
   }

   private constructor() {}

   findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then((users: User[]) => res.json(users));
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user));
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then((user: User) => res.json(user));
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then((status) => res.send(status));
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then((status) => res.send(status));
}

