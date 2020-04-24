import { Chess_Piece } from './Chess_Piece.js'

class Pawn extends Chess_Piece {
    constructor(piece_number, side) {
        super('pawn', piece_number, side)
    }
}

export { Pawn }