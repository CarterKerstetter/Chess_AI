import { Chess_Piece } from './Chess_Piece.js'

class Rook extends Chess_Piece {
    constructor(piece_number, side) {
        super('rook', piece_number, side)
    }
}

export { Rook }