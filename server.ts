import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import mongoose from 'mongoose';

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

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

// const PORT = 4000;
app.listen(process.env.PORT);