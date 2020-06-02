import { Correct_Turn } from './Correct_Turn.js'
import { No_Friendly_Fire } from './No_Friendly_Fire.js'
import { Piece_Movement } from './Piece_Movement.js'
import { Pawn_Capture } from './Pawn_Capture.js'
import { Must_Move } from './Must_Move.js'

const rules = [new Correct_Turn(), new No_Friendly_Fire(), new Piece_Movement(), new Pawn_Capture(), new Must_Move()]

class Ruleset {
    constructor() {
    }

    isValid( board, turn, move, description ) {
        for(let index = 0; index < rules.length; index++) {
            let rule = rules[ index ]
            if( !rule.isValid( board, turn, move ) ) {
                if( description ) {
                    console.log( 'Rule Check Failed:' )
                    console.log( rule.description )
                }
                return false
            }
        }
        return true
    }
}

export { Ruleset }