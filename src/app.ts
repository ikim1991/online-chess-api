import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import userRouter from './routers/user';
import gameRouter from './routers/game';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(gameRouter);

export default app;
