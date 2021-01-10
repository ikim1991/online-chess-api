import mongoose, { Schema, Document, Model } from 'mongoose';

interface PlayerI extends Document{
    username: string,
    ready: boolean,
    color?: string,
    hand?: string,
    result?: string
}

const PlayerSchema: Schema = new mongoose.Schema({
    username: {type: String},
    ready: {type: Boolean},
    color: {type: String},
    hand: {type: String},
    result: {type: String}
})

interface GameI extends Document{
    identifier: string;
    host: PlayerI,
    joiner: PlayerI,
    gameState: string
}

interface GameIDoc extends GameI, Document{ 
    rockPaperScissors: () => boolean,
    resetHand: () => void,
    exitRoom: (username: string) => boolean,
 }

interface GameIModel extends Model<GameIDoc>{
    createRoom: (identifier: string, username: string) => GameI,
    joinRoom: (identifier: string, username: string) => GameI
}

const gameSchema: Schema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    host: PlayerSchema,
    joiner: PlayerSchema,
    gameState: {
        type: String,
        required: true,
        default: 'QUEUE'
    }
})

gameSchema.static('createRoom', async (identifier: string, username: string) => {

    const game = await new Game({
        identifier,
        host: {
            username,
            ready: false
        },
        joiner: {
            username: "",
            ready: false,
        }
    })
    await game.save()

    return game;
})

gameSchema.static('joinRoom', async (identifier: string, username: string) => {

    const game = await Game.findOne({identifier});

    game!.joiner.username = username
    game!.joiner.ready = false

    await game!.save()

    return game;
})

gameSchema.method('rockPaperScissors', async function(this: GameI){

    const game = this

    if(game!.host.hand === 'ROCK' && game!.joiner!.hand === 'PAPER'){

        game!.host.result = 'LOSE'
        game!.host.color = 'BLACK'
        game!.joiner.result = 'WIN'
        game!.joiner.color = 'WHITE'

        await game!.save()

        return true
    } else if(game!.host.hand === 'PAPER' && game!.joiner!.hand === 'ROCK'){

        game!.host.result = 'WIN'
        game!.host.color = 'WHITE'
        game!.joiner.result = 'LOSE'
        game!.joiner.color = 'BLACK'

        await game!.save()

        return true
    } else if(game!.host.hand === 'PAPER' && game!.joiner!.hand === 'SCISSORS'){

        game!.host.result = 'LOSE'
        game!.host.color = 'BLACK'
        game!.joiner.result = 'WIN'
        game!.joiner.color = 'WHITE'

        await game!.save()

        return true
    } else if(game!.host.hand === 'SCISSORS' && game!.joiner!.hand === 'PAPER'){

        game!.host.result = 'WIN'
        game!.host.color = 'WHITE'
        game!.joiner.result = 'LOSE'
        game!.joiner.color = 'BLACK'

        await game!.save()

        return true
    } else if(game!.host.hand === 'SCISSORS' && game!.joiner!.hand === 'ROCK'){

        game!.host.result = 'LOSE'
        game!.host.color = 'BLACK'
        game!.joiner.result = 'WIN'
        game!.joiner.color = 'WHITE'

        await game!.save()

        return true
    } else if(game!.host.hand === 'ROCK' && game!.joiner!.hand === 'SCISSORS'){

        game!.host.result = 'WIN'
        game!.host.color = 'WHITE'
        game!.joiner.result = 'LOSE'
        game!.joiner.color = 'BLACK'

        await game!.save()

        return true
    } else{

        game!.host.result = 'DRAW'
        game!.joiner.result = 'DRAW'

        await game!.save()

        return false
    }
})

gameSchema.method('exitRoom', async function(this: GameI, username: string){

    const game = this;

    if(game){
        if(game.joiner.username === username){
            game.joiner.username = ""
            game.joiner.ready = false
            delete game.joiner.result
            delete game.joiner.color
            delete game.joiner.hand

            game.gameState = 'QUEUE'

            await game.save()
            return true
        } else{
            if(game.joiner.username.length > 0){
                game.host.username = game.joiner.username
                game.host.ready = false
                delete game.host.result
                delete game.host.color
                delete game.host.hand
    
                game.joiner.username = ""
                game.joiner.ready = false
                delete game.joiner.result
                delete game.joiner.color
                delete game.joiner.hand

                game.gameState = 'QUEUE'
    
                await game.save()
                return true
            } else{
                game.host.username = ""
                await game.save()
                return false
            }
        }
    }

    return false
})

gameSchema.method('resetHand', async function(this: GameI){

    const game = this
    if(game){
        game.host.hand = undefined
        game.host.result = undefined

        game.joiner.hand = undefined
        game.joiner.result = undefined

        await game.save()
    }

})

const Game = mongoose.model<GameIDoc, GameIModel>("Game", gameSchema);
export default Game;