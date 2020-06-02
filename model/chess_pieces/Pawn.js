import { Chess_Piece } from './Chess_Piece.js'
import { Position } from './motion/Position.js'

class Pawn extends Chess_Piece {
    constructor(piece_number, side) {
        super('pawn', piece_number, side)
    }

    isValidMove( move ) {
        // 1 or 2 spaces forward, or 1 space diagonal and forward capturing something
        let forward = 1
        if( this.side == 'white' ) {
            forward = -1 
        }
        let row_difference = move.end_position.row - move.start_position.row
        let col_difference = move.end_position.col - move.start_position.col
        // check that pawn is moving forward
        if( forward != row_difference/Math.abs( row_difference ) ) {
            return false
        }
        let position_list = [ move.start_position ]
        // movement without capturing an enemy
        if( Math.abs( col_difference ) == 0 ) {
            let position = new Position( move.start_position.row + forward, move.start_position.col )
            position_list.push( position )
            // move one space forward
            if( Math.abs( row_difference ) == 1 ) {
                return position_list
            }
            // move two spaces forward
            else if( Math.abs( row_difference ) == 2 ) {
                position_list.push( move.end_position )
                // can only do this on first movement of the game
                if( !this.has_moved ) {
                    return position_list
                }
                else {
                    return false
                }
            }
            // pawn moved too far
            else {
                return false
            }
        }
        // movement by capturing an enemy
        if( Math.abs( col_difference ) == 1 ) {
            // correct distance
            if( Math.abs( row_difference ) == 1 ) {
                position_list.push( move.end_position )
                return position_list
            }
            // moved too far
            else {
                return false
            }
        }
        return false
    }
}

export { Pawn }