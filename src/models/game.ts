import mongoose, { Schema, Document, Model } from 'mongoose';

export interface GameI extends Document{
    identifier: string;
    host: {
        username: string,
        ready: boolean,
        color?: string,
        hand?: string,
        result?: string
    },
    joiner: {
        username: string,
        ready: boolean,
        color?: string,
        hand?: string,
        result?: string
    },
    gameState: string
}

interface GameIDoc extends GameI, Document{
    rockPaperScissors: (identifier: string) => boolean
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
    host: {type: Schema.Types.Mixed},
    joiner: {type: Schema.Types.Mixed},
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

    game!.joiner = {
        username,
        ready: false,
    }

    await game!.save()

    return game;
})

gameSchema.method('rockPaperScissors', async (identifier: string) => {

    const game = await Game.findOne({identifier})

    if(game!.host.hand === 'ROCK' && game!.joiner!.hand === 'PAPER'){

        game!.host.result = 'LOSE'
        game!.joiner!.result = 'WIN'
        game!.host.color = 'BLACK'
        game!.joiner!.color = 'WHITE'
        await game!.save()

        return true
    } else if(game!.host.hand === 'PAPER' && game!.joiner!.hand === 'ROCK'){
        game!.host.result = 'WIN'
        game!.joiner!.result = 'LOSE'
        game!.host.color = 'WHITE'
        game!.joiner!.color = 'BLACK'
        await game!.save()

        return true
    } else if(game!.host.hand === 'PAPER' && game!.joiner!.hand === 'SCISSORS'){

        game!.host.result = 'LOSE'
        game!.joiner!.result = 'WIN'
        game!.host.color = 'BLACK'
        game!.joiner!.color = 'WHITE'
        await game!.save()

        return true
    } else if(game!.host.hand === 'SCISSORS' && game!.joiner!.hand === 'PAPER'){
        game!.host.result = 'WIN'
        game!.joiner!.result = 'LOSE'
        game!.host.color = 'WHITE'
        game!.joiner!.color = 'BLACK'
        await game!.save()

        return true
    } 
    else if(game!.host.hand === 'SCISSORS' && game!.joiner!.hand === 'ROCK'){
        game!.host.result = 'LOSE'
        game!.joiner!.result = 'WIN'
        game!.host.color = 'BLACK'
        game!.joiner!.color = 'WHITE'
        await game!.save()

        return true
    } else if(game!.host.hand === 'ROCK' && game!.joiner!.hand === 'SCISSORS'){
        game!.host.result = 'WIN'
        game!.joiner!.result = 'LOSE'
        game!.host.color = 'WHITE'
        game!.joiner!.color = 'BLACK'
        await game!.save()

        return true
    } else{
        game!.host.result = 'DRAW'
        game!.joiner!.result = 'DRAW'
        await game!.save()

        return false
    }
})

const Game = mongoose.model<GameIDoc, GameIModel>("Game", gameSchema);
export default Game;