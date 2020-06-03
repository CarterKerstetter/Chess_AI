import { Chess_Board } from './Chess_Board.js'
import { Bishop } from './chess_pieces/Bishop.js'
import { King } from './chess_pieces/King.js'
import { Knight } from './chess_pieces/Knight.js'
import { Pawn } from './chess_pieces/Pawn.js'
import { Queen } from './chess_pieces/Queen.js'
import { Rook } from './chess_pieces/Rook.js'
import { Ruleset } from './chess_rules/Ruleset.js'

const EventEmitter = require('events').EventEmitter

class Chess_Model extends EventEmitter {
    chess_board = new Chess_Board()
    ruleset = new Ruleset()
    turn
    previous_move
    total = 0

    constructor() {
        super()
        this.addPiece = this.addPiece.bind( this );
        this.removePiece = this.removePiece.bind( this );
        this.chess_board.addListener('add_piece', this.addPiece)
        this.chess_board.addListener('remove_piece', this.removePiece)
    }

    getPossibleEndPositions( position ) {
        return this.ruleset.getPossibleEndPositions( this.chess_board, this.turn, position, this.previous_move )
    }

    movePiece( move ) {
        let rule_info = this.isValidMove( move, false )
        if( rule_info ) {
            this.chess_board.movePiece( move )
            this.previous_move = move
            if( 'en_passant' in rule_info ) {
                this.chess_board.removePiece( rule_info[ 'en_passant' ] )
            }
            this.swapTurn()
        }
    }

    handleEnPassant( move ) {

    }

    handlePawnPromotion( move ) {

    }

    handleCheckMate( move ) {

    }

    isValidMove( move, description ) {
        return this.ruleset.isValid( this.chess_board, this.turn, move, this.previous_move, description )
    }

    getPiece( position ) {
        return this.chess_board.getPiece( position )
    }

    get turn() {
        return this.turn
    }

    swapTurn() {
        if( this.turn == 'white' ) {
            this.turn = 'black'
        }
        else {
            this.turn = 'white'
        }
    }

    resetGame() {
        this.turn = 'white'
        this.chess_board.clear()
        // add all pawns
        for( let index = 0 ; index < this.chess_board.BOARD_SIZE ; index++ ) {
            let white_pawn = new Pawn( index, 'white' )
            let black_pawn = new Pawn( index, 'black' )
            let white_pawn_position = {
                row:    6,
                col:    index
            }
            let black_pawn_position = {
                row:    1,
                col:    index
            }
            this.chess_board.addPiece( white_pawn, white_pawn_position )
            this.chess_board.addPiece( black_pawn, black_pawn_position )
        }
        for( let index = 0 ; index < 2 ; index++ ) {
            // add rooks
            let white_rook = new Rook( index, 'white' )
            let black_rook = new Rook( index, 'black' )
            let white_rook_position = {
                row:    7,
                col:    index * 7
            }
            let black_rook_position = {
                row:    0,
                col:    index * 7
            }
            this.chess_board.addPiece( white_rook, white_rook_position )
            this.chess_board.addPiece( black_rook, black_rook_position )
            // add knights
            let white_knight = new Knight( index, 'white' )
            let black_knight = new Knight( index, 'black' )
            let white_knight_position = {
                row:    7,
                col:    1 + index * 5
            }
            let black_knight_position = {
                row:    0,
                col:    1 + index * 5
            }
            this.chess_board.addPiece( white_knight, white_knight_position )
            this.chess_board.addPiece( black_knight, black_knight_position )
            // add bishops
            let white_bishop = new Bishop( index, 'white' )
            let black_bishop = new Bishop( index, 'black' )
            let white_bishop_position = {
                row:    7,
                col:    2 + index * 3
            }
            let black_bishop_position = {
                row:    0,
                col:    2 + index * 3
            }
            this.chess_board.addPiece( white_bishop, white_bishop_position )
            this.chess_board.addPiece( black_bishop, black_bishop_position )
        }
        // add kings
        let white_king = new King( 0, 'white' )
        let black_king = new King( 0, 'black' )
        let white_king_position = {
            row:    7,
            col:    4
        }
        let black_king_position = {
            row:    0,
            col:    4
        }
        this.chess_board.addPiece( white_king, white_king_position )
        this.chess_board.addPiece( black_king, black_king_position )
        // add queens
        let white_queen = new Queen( 0, 'white' )
        let black_queen = new Queen( 0, 'black' )
        let white_queen_position = {
            row:    7,
            col:    3
        }
        let black_queen_position = {
            row:    0,
            col:    3
        }
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