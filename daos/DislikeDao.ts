/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
 import DislikeDaoI from "../interfaces/DislikeDaoI";
 import DislikeModel from "../mongoose/DislikeModel";
 import Dislike from "../models/Dislike";
 
 /**
  * @class DislikeDao Implements Data Access Object managing data storage
  * of Dislikes
  * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
  */
 export default class DislikeDao implements DislikeDaoI {
     private static dislikeDao: DislikeDao | null = null;
     public static getInstance = (): DislikeDao => {
         if(DislikeDao.dislikeDao === null) {
             DislikeDao.dislikeDao = new DislikeDao();
         }
         return DislikeDao.dislikeDao;
     }
     private constructor() {}
 
     findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
             DislikeModel
             .findOne({tuit: tid, dislikedBy: uid});
 
     countHowManyDislikedTuit = async (tid: string): Promise<number> =>
             DislikeModel.
             count({tuit: tid});
 
 
      /**
       * Uses DislikeModel to retrieve all user documents liking a tuit from users collection
       * @param {string} tid Tuit's primary key
       * @returns Promise To be notified when the users are retrieved from
       * database
       */ 
     findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
         DislikeModel
             .find({tuit: tid})
             .populate("dislikedBy")
             .exec();
 
      /**
       * Uses DislikeModel to retrieve all tuit documents disliked by a user from tuits collection
       * @param {string} uid User's primary key
       * @returns Promise To be notified when the dislikes are retrieved from
       * database
       */ 
     findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
         DislikeModel
             .find({dislikedBy: uid})
             .populate("tuit")
             .exec();
 
      /**
       * Inserts dislike instance into the database
       * @param {string} uid User's primary key
       * @param {string} tid Tuit's primary key
       * @returns Promise To be notified when dislike is inserted into the database
       */
     userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
         DislikeModel.create({tuit: tid, dislikedBy: uid});
 
      /**
       * Removes dislike from the database.
       * @param {string} uid User's primary key
       * @param {string} tid Tuit's primary key
       * @returns Promise To be notified when dislike is removed from the database
       */
     userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
         DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
 }
 