import { Position } from './Position.js';

const EventEmitter = require('events').EventEmitter

class Chess_Board extends EventEmitter {
    BOARD_SIZE = 8
    board = new Array( this.BOARD_SIZE * this.BOARD_SIZE ).fill( false )

    constructor() {
        super()
    }

    clear() {
        for ( let index = 0 ; index < this.board.length ; index++) {
            let chess_piece = this.board[ index ]
            if( chess_piece ) {
                this.board[ index ] = false
                position = this.convert1DToPosition( index )
                this.emit( 'remove_piece', chess_piece, position )
            }
        }
    }

    movePiece( move ) {
        let moving_piece = this.removePiece( move.start_position )
        this.removePiece( move.end_position )
        this.addPiece( moving_piece, move.end_position )
    }

    addPiece( chess_piece, position ) {
        let index = this.convertPositionTo1D( position )
        this.board[ index ] = chess_piece
        this.emit( 'add_piece', chess_piece, position )
    }

    removePiece( position ) {
        let index = this.convertPositionTo1D( position )
        let chess_piece = this.board[ index ]
        this.board[ index ] = false
        if( chess_piece ) {
            this.emit( 'remove_piece', chess_piece, position )
        }
        return chess_piece
    }

    getPiece( position ) {
        return this.board[ this.convertPositionTo1D( position ) ]
    }

    convertPositionTo1D( position ) {
        return position.row * this.BOARD_SIZE + position.col
    }

    convert1DToPosition( index ) {
        let row = index % this.BOARD_SIZE
        let col = Math.floor( index / this.BOARD_SIZE )
        return new Position( row, col )
    }
}

export { Chess_Board }