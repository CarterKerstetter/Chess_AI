import { Chess_Piece } from './Chess_Piece.js'
import { Position } from './motion/Position.js'

class King extends Chess_Piece {
    constructor(piece_number, side) {
        super('king', piece_number, side)
    }
}

export { King }