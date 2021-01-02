import mongoose, { Schema, Document, Model } from 'mongoose';

interface ChesspieceI extends Document{
    id: string;
    rank: string;
    color: string;
    position: string;
    coord: [number, number][];
    hasBeenMoved: boolean;
    inPlay: boolean;
}

const ChesspieceSchema: Schema = new mongoose.Schema({
    id: {type: String},
    rank: {type: String},
    color: {type: String},
    position: {type: String},
    coord: [{type: Array}],
    hasBeenMoved: {type: Boolean},
    inPlay: {type: Boolean}
})

interface PlayerI extends Document{
    player: {
        username: string;
        ready: boolean;
        color: string;
        turn: boolean;
        check: boolean;
    }
}

const PlayerSchema: Schema = new mongoose.Schema({
    username: String,
    ready: Boolean,
    color: String,
    turn: Boolean,
    check: Boolean
})

interface ChessboardI extends Document{
    identifier: string;
    columns: {[key: string]: number}[];
    rows: number[];
    occupied: {[key: string]: string};
    chesspieces: ChesspieceI[];
    players: PlayerI[];
}

interface ChessboardIDoc extends ChessboardI, Document{
    setupBoard: () => void
}

interface ChessboardIModel extends Model<ChessboardIDoc>{

}

const chessboardSchema: Schema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    columns: {
        type: Array,
        default: [{'a': 1}, {'b': 2}, {'c': 3}, {'d': 4}, {'e': 5}, {'f': 6}, {'g': 7}, {'h': 8}]
    },
    rows: {
        type: Array,
        default: [8, 7, 6, 5, 4, 3, 2, 1]
    },
    chesspieces: {
        type: [ChesspieceSchema]
    },
    occupied: {
        type: Schema.Types.Mixed
    },
    players: [PlayerSchema]
});

chessboardSchema.method("setupBoard", async function(this: ChessboardI){
    const chessboard = this
    const initializer = [
        {color: 'WHITE', rank: 'KING', position: ['e1'], coords: [[5,1]], _ids: ['wk']},
        {color: 'BLACK',rank: 'KING', position:['e8'], coords: [[5,8]], _ids: ['bk']},
        {color:'WHITE', rank: 'QUEEN',position:['d1'], coords: [[4,1]], _ids: ['wq']},
        {color: 'BLACK', rank: 'QUEEN', position:['d8'], coords: [[4,8]], _ids: ['bq']},
        {color: 'WHITE', rank: 'BISHOP', position:['c1','f1'], coords: [[3,1],[6,1]], _ids: ['wb1', 'wb2']},
        {color: 'BLACK', rank: 'BISHOP', position:['c8','f8'], coords: [[3,8],[6,8]], _ids: ['bb1', 'bb2']},
        {color:'WHITE', rank: 'KNIGHT', position:['b1','g1'], coords:[[2,1],[7,1]], _ids: ['wk1', 'wk2']},
        {color: 'BLACK',rank: 'KNIGHT',position:['b8','g8'], coords:[[2,8],[7,8]], _ids: ['bk1', 'bk2']},
        {color:'WHITE',rank: 'ROOK',position:['a1','h1'], coords:[[1,1],[8,1]], _ids: ['wr1', 'wr2']},
        {color: 'BLACK',rank: 'ROOK',position:['a8','h8'], coords:[[1,8],[8,8]], _ids: ['br1', 'br2']},
        {
            color:'WHITE',
            rank: 'PAWN',
            position:['a2','b2','c2','d2','e2','f2','g2','h2'],
            coords:[[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2]],
            _ids: ['wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8']
        },
        {
            color: 'BLACK',
            rank: 'PAWN',
            position:['a7','b7','c7','d7','e7','f7','g7','h7'],
            coords:[[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7]],
            _ids: ['bp1', 'bp2', 'bp3', 'bp4', 'bp5', 'bp6', 'bp7', 'bp8']
        }
    ]

    let chesspieces: any = []
    initializer.forEach((piece, i) => {
        piece._ids.forEach((id, j) => {
            chesspieces.push({
                id: id,
                rank: piece.rank,
                color: piece.color,
                position: piece.position[j],
                coord: piece.coords[j],
                hasBeenMoved: false,
                inPlay: true
            })
        })
    })

    let positions: {[key:string]: string} = {}
    chesspieces.forEach((piece: any) => {
        positions[piece.id] = piece.position
    })

    chessboard.chesspieces = chesspieces
    chessboard.occupied = positions
    
    await chessboard.save()
})

const Chessboard = mongoose.model<ChessboardIDoc, ChessboardIModel>("Chessboard", chessboardSchema);
export default Chessboard;