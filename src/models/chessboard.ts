import mongoose, { Schema, Document } from 'mongoose';

export interface ChessboardI extends Document{
    identifer: string;
}

const ChessboardSchema: Schema = new mongoose.Schema({
    identifer: {
        type: String,
        required: true
    }
});

const Chessboard = mongoose.model<ChessboardI>("Chesspiece", ChessboardSchema);
export default Chessboard;