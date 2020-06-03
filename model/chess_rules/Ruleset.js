import { Correct_Turn } from './Correct_Turn.js'
import { No_Friendly_Fire } from './No_Friendly_Fire.js'
import { Piece_Movement } from './Piece_Movement.js'
import { Pawn_Capture } from './Pawn_Capture.js'
import { Must_Move } from './Must_Move.js'

const rules = [new Correct_Turn(), new No_Friendly_Fire(), new Piece_Movement(), new Pawn_Capture(), new Must_Move()]

class Ruleset {
    constructor() {
    }

    isValid( board, turn, move, previous_move, description ) {
        let rule_info = {}
        // check validation rules
        for(let index = 0; index < rules.length; index++) {
            let rule = rules[ index ]
            let valid = rule.isValid( board, turn, move, previous_move )
            if( !valid ) {
                if( description ) {
                    console.log( 'Rule Check Failed:' )
                    console.log( rule.description )
                }
                return false
            }
            else {
                // a dictionary is returned, add it to our info
                if( valid != true) {
                    rule_info = {...rule_info, ...valid}
                }
            }
        }
        // if( this.inCheck( board, turn, move, en_passant_position ) ) {
        //     return false
        // }
        return rule_info
    }

    handlePawnPromotion( move ) {

    }

    inCheck( board, turn, move, en_passant_position ) {
        
    }

    getPossibleMoves( board, turn, previous_move ) {
        
    }

    getPossibleEndPositions( board, turn, position, previous_move ) {
        let position_list = []
        for( let end_row = 0 ; end_row < board.BOARD_SIZE ; end_row++) {
            for( let end_col = 0 ; end_col < board.BOARD_SIZE ; end_col++) {
                let end_position = {
                    row:    end_row,
                    col:    end_col
                }
                let move = {
                    start_position: position,
                    end_position:   end_position
                }
                if( this.isValid( board, turn, move, previous_move, false ) )  {
                    position_list.push( end_position )
                }
            }
        }
        return position_list
    }


}

export { Ruleset }