/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import LikeController from './controllers/LikeController';
import MessageController from './controllers/MessageController';
import FollowController from './controllers/FollowController';
import BookmarkController from './controllers/BookmarkController';
import mongoose from 'mongoose';
const cors = require("cors");

// To read the config file
dotenv.config();

// Connnect to DB
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ei10j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connectionString)

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'https://6236551fb14fd20b0df6c5f1--epic-goldberg-90b64d.netlify.app/'
    // origin: 'http://localhost:3000'
}));

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// Setting up the instance for each RESTfull API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const messageController = MessageController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
app.listen(process.env.PORT);
