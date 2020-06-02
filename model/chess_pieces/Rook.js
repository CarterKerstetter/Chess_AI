import { Chess_Piece } from './Chess_Piece.js'
import { Position } from './motion/Position.js'

class Rook extends Chess_Piece {
    constructor(piece_number, side) {
        super('rook', piece_number, side)
    }
}

export { Rook }