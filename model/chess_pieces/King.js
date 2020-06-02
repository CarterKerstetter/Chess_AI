import { Chess_Piece } from './Chess_Piece.js'

class King extends Chess_Piece {
    constructor(piece_number, side) {
        super('king', piece_number, side)
    }

    isValidMove( move ) {
        // can only move one space in any direction
        let row_difference = Math.abs( move.end_position.row - move.start_position.row )
        let col_difference = Math.abs( move.end_position.col - move.start_position.col )
        if( row_difference > 1 || col_difference > 1 ) {
            return false
        }
        else {
            let position_list = [ move.start_position, move.end_position ]
            return position_list
        }
    }
}

export { King }