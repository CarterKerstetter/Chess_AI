const EventEmitter = require('events').EventEmitter
import { AI_Controller } from './chess_ai/AI_Controller.js';

class Chess_Controller extends EventEmitter {
  model
  ai
  human_side
  ai_side
  first_row = undefined
  first_col = undefined
  first_position = undefined
  highlighted_positions = []

  constructor( model ) {
      super()
      this.addPiece = this.addPiece.bind(this)
      this.removePiece = this.removePiece.bind(this)
      this.selectSquare = this.selectSquare.bind(this)
      this.model = model
      this.ai = new AI_Controller()
      this.setupModel()
  }

  get AiNames() {
    return AI_Controller.getAiNames()
  }

  setAi( type ) {
    this.ai.setAi( type )
  }

  selectSquare( row, col, side ) {
    let position = {
      row:  row,
      col:  col
    }
    // selecting a piece to move
    if( typeof this.first_position === "undefined" ) {
      let piece = this.model.getPiece( position )
      //TODO switch this back when done testing
      //if( piece && ( piece.side == side ) && ( side == this.model.turn ) ) {
      if( piece && ( piece.side == this.model.turn ) ) {
        this.first_position = position
        this.emit( 'highlight_square', row, col )
        this.highlighted_positions = this.model.getPossibleEndPositions( position )
        for( let index = 0 ; index < this.highlighted_positions.length ; index++ ) {
          let end_position = this.highlighted_positions[ index ]
          this.emit( 'highlight_square', end_position.row, end_position.col )
        }
      }
    }
    // attempt to move piece from previously specified location
    else {
      // remove previous highlighting
      this.emit( 'remove_highlight_from_square', this.first_position.row, this.first_position.col )
      for( let index = 0 ; index < this.highlighted_positions.length ; index++ ) {
        let end_position = this.highlighted_positions[ index ]
        this.emit( 'remove_highlight_from_square', end_position.row, end_position.col )
      }
      let move = {
        start_position: this.first_position,
        end_position:   position
      }
      if( this.model.isValidMove( move, true ) ) {
        this.model.movePiece( move )
      }
      this.first_position = undefined
      this.highlighted_positions = undefined
    }
  }

  startGame() {
    this.model.resetGame()
    this.ai_side = 'black'
    this.human_side = 'white'
    return this.human_side
  }

  addPiece( chess_piece, position ) {
    let id = chess_piece.id
    let img_src = chess_piece.img_src
    let row = position.row
    let col = position.col
    this.emit( 'add_piece', id, img_src, row, col )
  }

  removePiece( chess_piece, position ) {
    let id = chess_piece.id
    this.emit( 'remove_piece', id )
  }

  setupModel() {
    this.model.addListener( 'add_piece', this.addPiece )
    this.model.addListener( 'remove_piece', this.removePiece )
  }
  
}

export { Chess_Controller }