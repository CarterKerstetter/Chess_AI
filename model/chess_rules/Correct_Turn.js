import { Rule } from './Rule.js'

class Correct_Turn extends Rule {
    constructor() {
        super()
        this.description = 'Correct_Turn: Check whether the piece moving and the current turn are the same.'
    }

    // check that it is the correct turn
    isValid( board, turn, move ) {
        let moving_piece = board.getPiece( move.start_position )
        // there is no piece at the start position
        if( !moving_piece ) {
            return false
        }
        // the moving piece is moving on the correct turn
        if( turn == moving_piece.side ) {
            return true
        }
        return false
    }
}

export { Correct_Turn }