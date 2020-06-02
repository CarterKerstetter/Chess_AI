import { Rule } from './Rule.js'

class Pawn_Capture extends Rule {
    constructor() {
        super()
        this.description = 'Correct_Turn: If the piece moving is a pawn, it must be capturing if it moves diagonally. \
            Otherwise it must be moving forward only.'
    }

    // if the column difference is 1, we must be capturing, if it is 0 we must not be capturing
    isValid( board, turn, move ) {
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
            else {
                return false
            }
        }
        else {
            return false
        }
    }
}

export { Pawn_Capture }