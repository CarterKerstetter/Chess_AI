import { Rule } from './Rule.js'

class No_Friendly_Fire extends Rule {
    constructor() {
        super()
        this.description = 'No_Friendly_Fire: Check if the piece being taken is an ally or not.'
    }

    // check that last square landed on is empty or an enemy
    isValid( board, turn, move, previous_move ) {
        let moving_piece = board.getPiece( move.start_position )
        // there is no piece at the start position
        if( !moving_piece ) {
            return false
        }
        let captured_piece = board.getPiece( move.end_position )
        // the end position has no piece in it
        if( !captured_piece ) {
            return true
        }
        // trying to capture one's own piece
        if( moving_piece.side == captured_piece.side ) {
            return false
        }
        return true
    }
}

export { No_Friendly_Fire }