import express, {Application} from 'express';
import http from 'http';
import cors from 'cors';
import gameRouter from './routers/game';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(gameRouter);

export default http.createServer(app);
