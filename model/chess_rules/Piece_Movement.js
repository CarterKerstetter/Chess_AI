import { Rule } from './Rule.js'

class Piece_Movement extends Rule {
    constructor() {
        super()
        this.description = 'Piece_Movement: Check that the movement of the piece is valid and that nothing is in the way.'
    }

    // check a piece exists, check if the move is in the correct trajectory, and nothing is in the way
    isValid( board, turn, move ) {
        let moving_piece = board.getPiece( move.start_position )
        // there is no piece at the start position
        if( !moving_piece ) {
            return false
        }
        let movement = moving_piece.isValidMove( move )
        // trajectory is wrong
        if( !movement ) {
            return false
        }
        let unoccupied_spaces = movement.slice(1, -1)
        for( let index = 0 ; index < unoccupied_spaces.length ; index++ ) {
            let unoccupied_space = unoccupied_spaces[ index ]
            // there is a piece in the way
            if( board.getPiece( unoccupied_space ) ) {
                return false
            }
        }
        return true
    }
}

export { Piece_Movement }