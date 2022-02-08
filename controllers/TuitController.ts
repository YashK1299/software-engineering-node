import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from "../models/Tuit";

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
       if(TuitController.tuitController === null) {
           TuitController.tuitController = new TuitController();
           
           // for testing without postman. Not RESTful
           app.get("/tuits/create", TuitController.tuitController.createTuit);
           app.get("/tuits/:uid/delete", TuitController.tuitController.deleteTuit);
           
           // RESTful User Web service API
           app.get("/tuits", TuitController.tuitController.findAllTuits);
           app.get("/tuits/:tuitid", TuitController.tuitController.findTuitById);
           app.get("/tuits/:uid/tuits", TuitController.tuitController.findTuitsByUser);
           app.post("/tuits", TuitController.tuitController.createTuit);
           app.put("/tuits/:tuitid", TuitController.tuitController.updateTuit);
           app.delete("/tuits/:tuitid", TuitController.tuitController.deleteTuit);
       }
       return TuitController.tuitController;
   }

   private constructor() {}
   
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.uid)
            .then((tuit: Tuit | null) => res.json(tuit));
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body)
            .then((tuit: Tuit) => res.json(tuit));
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.uid)
            .then((status) => res.send(status));
}

