import http from 'http';
import app from './app';
import io from 'socket.io';

import User from './models/user';
import Game from './models/game';

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)    
})