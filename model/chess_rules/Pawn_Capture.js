import { Rule } from './Rule.js'

class Pawn_Capture extends Rule {
    constructor() {
        super()
        this.description = 'Pawn_Capture: If the piece moving is a pawn, it must be capturing if it moves diagonally. \
            Otherwise it must be moving forward only.'
    }

    // if the column difference is 1, we must be capturing, if it is 0 we must not be capturing
    isValid( board, turn, move, previous_move ) {
        let moving_piece = board.getPiece( move.start_position )
        // there is no piece at the start position
        if( !moving_piece ) {
            return false
        }
        // don't need to check this rule if the moving piece isn't a pawn
        if( moving_piece.constructor.name != 'Pawn' ) {
            return true
        }
        let col_difference = Math.abs( move.end_position.col - move.start_position.col )
        // end position must be empty
        if( col_difference == 0 ) {
            if( board.getPiece( move.end_position )) {
                return false
            }
            else {
                return true
            }
        }
        else if( col_difference == 1 ) {
            if( board.getPiece( move.end_position )) {
                return true
            }
            // can be true if doing an en passant
            else {
                let en_passant_position = this.handleEnPassant( board, move, previous_move )
                if( en_passant_position ) {
                    return {
                        en_passant: en_passant_position
                    }
                }
                else {
                    return false
                }
            }
        }
        else {
            return false
        }
    }

     // check that if an en passant occurs
     handleEnPassant( board, move, previous_move ) {
        // this is the first move of the game
        if( !previous_move ) {
            return false
        }
        let current_piece = board.getPiece( move.start_position )
        let previous_piece = board.getPiece( previous_move.end_position )
        // if current move is not a pawn
        if( current_piece.constructor.name != 'Pawn' ) {
            return false
        }
        // previous move was not a pawn
        if( previous_piece.constructor.name != 'Pawn' ) {
            return false
        }
        let previous_row_difference = previous_move.end_position.row - previous_move.start_position.row
        // previous pawn did not move 2 spaces
        if( Math.abs( previous_row_difference ) != 2 ) {
            return false
        }
        let en_passant_position = {
            row:    previous_move.start_position.row + previous_row_difference / Math.abs( previous_row_difference ),
            col:    previous_move.end_position.col
        }
        // end column is not on the en passant row
        if( move.end_position.col != en_passant_position.col ) {
            return false
        }
        // end row is not on the en passant row
        if( move.end_position.row != en_passant_position.row ) {
            return false
        }
        // return the position of the pawn to remove from en passant rule
        return previous_move.end_position
    }
}

export { Pawn_Capture }