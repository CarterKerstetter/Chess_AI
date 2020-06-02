import { Chess_Board } from './Chess_Board.js';
import { Bishop } from './chess_pieces/Bishop.js'
import { King } from './chess_pieces/King.js'
import { Knight } from './chess_pieces/Knight.js'
import { Pawn } from './chess_pieces/Pawn.js'
import { Queen } from './chess_pieces/Queen.js'
import { Rook } from './chess_pieces/Rook.js'
import { Position } from './Position.js'
import { Move } from './Move.js';

const EventEmitter = require('events').EventEmitter

class Chess_Model extends EventEmitter {
    chess_board = new Chess_Board()
    turn
    total = 0

    constructor() {
        super()
        this.addPiece = this.addPiece.bind( this );
        this.removePiece = this.removePiece.bind( this );
        this.chess_board.addListener('add_piece', this.addPiece)
        this.chess_board.addListener('remove_piece', this.removePiece)
    }

    movePiece( first_x, first_y, second_x, second_y ) {
        let start_position = new Position( first_x, first_y )
        let end_position = new Position( second_x, second_y )
        let move = new Move( start_position, end_position )
        this.chess_board.movePiece( move )
    }

    canMove( first_x, first_y, second_x, second_y ) {
        return true
    }

    getPiece( row, col ) {
        let position = new Position( row, col )
        return this.chess_board.getPiece( position )
    }

    swapTurn() {
        if( this.turn == 'white' ) {
            this.turn == 'black'
        }
        else {
            this.turn == 'white'
        }
    }

    resetGame() {
        this.turn = 'white'
        this.chess_board.clear()
        // add all pawns
        for( let index = 0 ; index < this.chess_board.BOARD_SIZE ; index++ ) {
            let white_pawn = new Pawn( index, 'white' )
            let black_pawn = new Pawn( index, 'black' )
            let white_pawn_position = new Position( 6, index )
            let black_pawn_position = new Position( 1, index )
            this.chess_board.addPiece( white_pawn, white_pawn_position )
            this.chess_board.addPiece( black_pawn, black_pawn_position )
        }
        for( let index = 0 ; index < 2 ; index++ ) {
            // add rooks
            let white_rook = new Rook( index, 'white' )
            let black_rook = new Rook( index, 'black' )
            let white_rook_position = new Position( 7, index * 7 )
            let black_rook_position = new Position( 0, index * 7 )
            this.chess_board.addPiece( white_rook, white_rook_position )
            this.chess_board.addPiece( black_rook, black_rook_position )
            // add knights
            let white_knight = new Knight( index, 'white' )
            let black_knight = new Knight( index, 'black' )
            let white_knight_position = new Position( 7, 1 + index * 5 )
            let black_knight_position = new Position( 0, 1 + index * 5 )
            this.chess_board.addPiece( white_knight, white_knight_position )
            this.chess_board.addPiece( black_knight, black_knight_position )
            // add bishops
            let white_bishop = new Bishop( index, 'white' )
            let black_bishop = new Bishop( index, 'black' )
            let white_bishop_position = new Position( 7, 2 + index * 3 )
            let black_bishop_position = new Position( 0, 2 + index * 3 )
            this.chess_board.addPiece( white_bishop, white_bishop_position )
            this.chess_board.addPiece( black_bishop, black_bishop_position )
        }
        // add kings
        let white_king = new King( 0, 'white' )
        let black_king = new King( 0, 'black' )
        let white_king_position = new Position( 7, 4 )
        let black_king_position = new Position( 0, 4 )
        this.chess_board.addPiece( white_king, white_king_position )
        this.chess_board.addPiece( black_king, black_king_position )
        // add queens
        let white_queen = new Queen( 0, 'white' )
        let black_queen = new Queen( 0, 'black' )
        let white_queen_position = new Position( 7, 3 )
        let black_queen_position = new Position( 0, 3 )
        this.chess_board.addPiece( white_queen, white_queen_position )
        this.chess_board.addPiece( black_queen, black_queen_position )
    }

    addPiece( chess_piece, position ) {
        this.emit( 'add_piece', chess_piece, position )
    }

    removePiece( chess_piece, position ) {
        this.emit( 'remove_piece', chess_piece, position )
    }

  
}

export { Chess_Model }