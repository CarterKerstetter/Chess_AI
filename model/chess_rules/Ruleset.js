import { Correct_Turn } from './Correct_Turn.js'
import { No_Friendly_Fire } from './No_Friendly_Fire.js'
import { Piece_Movement } from './Piece_Movement.js'

const rules = [new Correct_Turn(), new No_Friendly_Fire(), new Piece_Movement()]

class Ruleset {
    constructor() {
    }

    isValid( board, turn, move ) {
        for(let index = 0; index < rules.length; index++) {
            let rule = rules[ index ]
            if( !rule.isValid( board, turn, move ) ) {
                return false
            }
        }
        return true
    }
}

export { Ruleset }