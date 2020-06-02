import { Chess_Piece } from './Chess_Piece.js'
import { Position } from './motion/Position.js'

class Bishop extends Chess_Piece {
    constructor( piece_number, side ) {
        super( 'bishop', piece_number, side )
    }

    isValidMove( move ) {
        // can only move diagonally
        let row_difference = move.end_position.row - move.start_position.row
        let col_difference = move.end_position.col - move.start_position.col
        if(Math.abs(row_difference) == Math.abs(col_difference)) {
            let initial_row = move.start_position.row
            let initial_col = move.start_position.col
            let row_step = row_difference/Math.abs(row_difference)
            let col_step = col_difference/Math.abs(col_difference)
            //return a list of all positions it will land on before reaching the destination
            let position_list = []
            for( let step_num = 0 ; step_num <= Math.abs( row_difference ) ; step_num++ ) {
                let row = initial_row + step_num * row_step
                let col = initial_col + step_num * col_step
                let position = new Position( row, col )
                position_list.push( position )
            }
            return position_list
        }
        return false
    }
}

export { Bishop }