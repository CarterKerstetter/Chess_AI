import { Rule } from './Rule.js'

class Must_Move extends Rule {
    constructor() {
        super()
        this.description = 'Must_Move: Check whether the start and end position of the move are different or not.'
    }

    // check that the start and end position are not identical
    isValid( board, turn, move ) {
        if( move.start_position == move.end_position ) {
            return false
        }
        else {
            return true
        }
    }
}

export { Must_Move }