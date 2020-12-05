import app from './app';
import io from 'socket.io';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)    
})