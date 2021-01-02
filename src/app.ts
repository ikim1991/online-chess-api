import express, {Application} from 'express';
import http from 'http';
import cors from 'cors';
import chessboardRouter from './routers/chessboard';
import gameRouter from './routers/game';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(chessboardRouter);
app.use(gameRouter);

export default http.createServer(app);
