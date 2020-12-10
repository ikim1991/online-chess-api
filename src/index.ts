import './db/mongoose';
import app from './app';
import { Socket } from 'socket.io';
import { NextFunction } from 'express';
import Game from './models/game';

const io = require('socket.io')(app, {
    cors: {
      origin: '*',
    }
  });

const PORT = process.env.PORT || 3001;

io.use((socket: Socket, next: NextFunction) => {
    console.log("MIDDLEWARE");
    next();
})


io.on('connection', (socket: Socket) => {

    console.log("Client Connected...");

    socket.on("joinRoom", async (identifier: string) => {
        socket.join(identifier);
        
        const game = await Game.findOne({identifier});
        
        io.to(identifier).emit('updateHostPage', game);
    })

    socket.on("onReady", async (identifier: string, userType: string, player: any) => {
        
        const game = await Game.findOne({identifier});

        if(userType === 'host'){
            game!.host = {
                username: player.username,
                ready: !player.ready
            }

            await game!.save()
        } else{
            game!.joiner = {
                username: player.username,
                ready: !player.ready
            }

            await game!.save()
        }

        if(game!.host.ready && game!.joiner!.ready){
            game!.gameState = 'READY';
            await game!.save();
        }

        io.to(identifier).emit("updateReady", game);

    })

    socket.on('leaveRoom', (identifier: string, username: string) => {
        console.log(username, identifier)
    })


    socket.on('disconnect', () => {
        console.log("Client Disconnected...")
    })
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)    
})