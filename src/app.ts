import express, {Application, Request, Response} from 'express';

const app: Application = express(); 
const PORT = process.env.PORT || 3001

app.get('/', (req: Request, res: Response) => {

    res.send("ONLINE CHESS API")
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)    
})