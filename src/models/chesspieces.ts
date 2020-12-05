import mongoose, { Schema, Document } from 'mongoose';

export interface ChesspieceI extends Document{
    identifer: string;
}

const ChesspieceSchema: Schema = new mongoose.Schema({
    identifer: {
        type: String,
        required: true
    }
});

const Chesspiece = mongoose.model<ChesspieceI>("Chesspiece", ChesspieceSchema);
export default Chesspiece;