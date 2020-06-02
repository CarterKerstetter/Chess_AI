const EventEmitter = require('events').EventEmitter
import { AI_Controller } from './chess_ai/AI_Controller.js';

class Chess_Controller extends EventEmitter {
  model
  ai
  human_side
  ai_side
  first_row = undefined
  first_col = undefined

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
    // selecting a piece to move
    if( typeof this.first_row === "undefined" ) {
      let piece = this.model.getPiece( row, col )
      if( piece && ( piece.side == side ) ) {
        this.first_row = row
        this.first_col = col
        this.emit( 'highlight_square', row, col )
      }
    }
    // attempt to move piece from previously specified location
    else {
      // remove previous highlighting
      this.emit( 'remove_highlight_from_square', this.first_row, this.first_col )
      if( this.model.canMove( this.first_row, this.first_col, row, col ) ) {
        this.model.movePiece( this.first_row, this.first_col, row, col )
      }
      this.first_row = undefined
      this.second_row = undefined
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