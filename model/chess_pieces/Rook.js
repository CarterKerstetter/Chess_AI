import { Chess_Piece } from './Chess_Piece.js'
import { Position } from './motion/Position.js'

class Rook extends Chess_Piece {
    constructor(piece_number, side) {
        super('rook', piece_number, side)
    }

    isValidMove( move ) {
        // can only move left, right, up, or down any amount of spaces
        let row_difference = move.end_position.row - move.start_position.row
        let col_difference =  move.end_position.col - move.start_position.col
        let initial_row = move.start_position.row
        let initial_col = move.start_position.col
        // moving only left or right
        if( Math.abs( row_difference ) == 0 ) {
            let col_step = col_difference / Math.abs( col_difference )
            let position_list = []
            for( let step_num = 0 ; step_num <= Math.abs( col_difference ) ; step_num++ ) {
                let col = initial_col + step_num * col_step
                let position = new Position( initial_row, col )
                position_list.push( position )
            }
            return position_list
        }
        // moving only up or down
        else if( Math.abs( col_difference ) == 0) {
            let row_step = row_difference / Math.abs( row_difference )
            let position_list = []
            for( let step_num = 0 ; step_num <= Math.abs( row_difference ) ; step_num++ ) {
                let row = initial_row + step_num * row_step
                let position = new Position( row, initial_col )
                position_list.push( position )
            }
            return position_list
        }
        //moving in more than one direction
        else {
            return false
        }
    }
}

export { Rook }