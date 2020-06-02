import { Chess_Piece } from './Chess_Piece.js'

class Knight extends Chess_Piece {
    constructor(piece_number, side) {
        super('knight', piece_number, side)
    }

    isValidMove( move ) {
        // can only two in one direction and one space perpendicular
        let row_difference = Math.abs( move.end_position.row - move.start_position.row )
        let col_difference = Math.abs( move.end_position.col - move.start_position.col )
        if( ( row_difference == 2 && col_difference == 1 ) || ( row_difference == 1 && col_difference == 2 )) {
            let position_list = [ move.start_position, move.end_position ]
            return position_list
        }
        return false
    }
}

export { Knight }