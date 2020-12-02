import mongoose, { Schema, Document } from 'mongoose';

export interface GameI extends Document{
    state: string;
}

const GameSchema: Schema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    }
})

const Game = mongoose.model<GameI>("Game", GameSchema);
export default Game;