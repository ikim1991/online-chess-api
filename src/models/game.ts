import mongoose, { Schema, Document } from 'mongoose';

export interface GameI extends Document{
    identifer: string;
}

const GameSchema: Schema = new mongoose.Schema({
    identifer: {
        type: String,
        required: true
    }
})

const Game = mongoose.model<GameI>("Game", GameSchema);
export default Game;