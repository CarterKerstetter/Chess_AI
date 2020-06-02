import { Chess_Piece } from './Chess_Piece.js'
import { Position } from './motion/Position.js'

class Queen extends Chess_Piece {
    constructor(piece_number, side) {
        super('queen', piece_number, side)
    }
}

export { Queen }