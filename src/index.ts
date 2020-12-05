import app from './app';
import { Socket } from 'socket.io';
const io = require('socket.io')(app, {
    cors: {
      origin: '*',
    }
  });

const PORT = process.env.PORT || 3001;

io.on('connection', (socket: Socket) => {
    console.log("Client Connected...");

    socket.on('disconnect', () => {
        console.log("Client Disconnected...")
    })

})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)    
})