import {Request, Response} from "express";

export default interface MessageControllerI {
    findAllMessagesSentByUser (req: Request, res: Response): void;
    findAllMessagesReceivedByUser (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    userMessagesUser (req: Request, res: Response): void;
};
