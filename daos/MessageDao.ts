/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message"; 

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static MessageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.MessageDao === null) {
            MessageDao.MessageDao = new MessageDao();
        }
        return MessageDao.MessageDao;
    }
    private constructor() {}
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("to")
            .exec();
    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("from")
            .exec();
    userDeletesMessage = async (uid1: string, uid2: string): Promise<any> =>
        MessageModel.deleteOne({to: uid2, from: uid1});
    userMessagesUser = async (message: Message, uid1: string, uid2: string): Promise<Message> =>
        MessageModel.create({...message, to: uid2, from: uid1});
}
