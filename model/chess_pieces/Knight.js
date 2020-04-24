import { Chess_Piece } from './Chess_Piece.js'

class Knight extends Chess_Piece {
    constructor(piece_number, side) {
        super('knight', piece_number, side)
    }
}

export { Knight }