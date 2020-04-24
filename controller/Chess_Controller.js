const EventEmitter = require('events').EventEmitter

class Chess_Controller extends EventEmitter {
  model

  constructor( model ) {
      super()
      this.addPiece = this.addPiece.bind(this);
      this.removePiece = this.removePiece.bind(this);
      this.model = model
      this.setupModel()
  }

  startGame() {
    this.model.resetGame()
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