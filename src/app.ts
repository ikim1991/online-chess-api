import express, {Application, Request, Response} from 'express';
import http from 'http';
import cors from 'cors';
import chessboardRouter from './routers/chessboard';
import chesspieceRouter from './routers/chesspieces';
import gameRouter from './routers/game';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(chessboardRouter);
app.use(chesspieceRouter);
app.use(gameRouter);

export default http.createServer(app);
