import mongoose, { Schema, Document, Model } from 'mongoose';

export interface GameI extends Document{
    identifier: string;
    host: {
        username: string,
        ready: boolean,
        color?: string
    },
    joiner?: {
        username: string,
        ready: boolean,
        color?: string
    },
    gameState: string
}

export interface GameIModel extends Model<GameI>{
    createRoom: (identifier: string, username: string) => void,
    joinRoom: (identifier: string, username: string) => void
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

const Game = mongoose.model<GameI, GameIModel>("Game", gameSchema);
export default Game;