/**
 * @file Represents the server file with all the api instances, and database connection
 */
import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import LikeController from './controllers/LikeController';
import MessageController from './controllers/MessageController';
import FollowController from './controllers/FollowController';
import BookmarkController from './controllers/BookmarkController';
import mongoose from 'mongoose';

// To read the config file
const dotenv = require('dotenv');
dotenv.config();

// Connnect to DB
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ei10j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connectionString)

const app = express();
app.use(express.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// Setting up the instance for each RESTfull API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const messageController = MessageController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);

app.listen(process.env.PORT);