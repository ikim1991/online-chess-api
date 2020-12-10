import{ Router, Request, Response } from 'express';
import Game from '../models/game';

const router: Router = Router()

router.get('/game', async (req: Request, res: Response) => {
    
    res.send('game')
})

router.post('/create', async (req: Request, res: Response) => {

    const { identifier, username } = req.body
    const validIdentifier = await Game.findOne({identifier});

    if(!validIdentifier){

        const game = await Game.createRoom(identifier, username);
        
        return res.send(game);

    }

    res.status(400).send({error: "Please try again..."})

});

router.get('/join', async (req: Request, res: Response) => {

    const games = await Game.find().select('identifier').where('joiner.username').equals("");

    const gameList = games.map(game => game.identifier)

    res.send(gameList);
});

router.post('/join', async (req: Request, res: Response) => {

    const { identifier, username } = req.body
    const validIdentifier = await Game.findOne({identifier});

    if(username === validIdentifier!.host.username){
        return res.status(400).send({error: "Please choose a different username..."})
    }

    if(validIdentifier && !validIdentifier.joiner!.username && validIdentifier.host.username !== username){

        const game = await Game.joinRoom(identifier, username);
        
        return res.send(game);
    }

    res.status(400).send({error: "Please try again..."})

});



export default router;