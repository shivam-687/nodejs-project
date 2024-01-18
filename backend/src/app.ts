import express, {Request, Response} from 'express';
import passport from 'passport';
import router from './routes';
import '@/lib/passport';
import errorHandler from './middleware/errorHandler';


const app = express();


app.use(express.json());
app.use(express.urlencoded());

// PASSPORT INITIALIZATION
app.use(passport.initialize());

app.use(router)

app.get('/', async(req: Request, res: Response)=> {
    res.send("This is Nodejs-Task Api")
})

app.use(errorHandler);

export default app;