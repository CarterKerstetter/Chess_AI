class Game_UI{
  FIRST_COLOR = 'white'
  SECOND_COLOR = 'black'
  BOARD_SIZE = 8

  constructor() {
    this.setupBoard()
  }

  createSquare( row, col ) {
    let square = document.createElement( 'div' )
    square.classList.add( 'chess_square' )
    let color = ( row + col ) % 2
    if(color == 0) {
      square.style.background = this.FIRST_COLOR
    }
    else {
      square.style.background = this.SECOND_COLOR
    }
    return square
  }

  addRowNumber( row ) {
    let row_indicator = document.createElement( 'div' )
    row_indicator.innerHTML = ( row + 1 ).toString()
    row_indicator.classList.add( 'row_indicator' )
    row_indicator.style.top = ( row * 90/8 + 7.75 ).toString() + 'vw'
    return row_indicator
  }

  addColLetter( col ) {
    let col_indicator = document.createElement( 'div' )
    col_indicator.innerHTML = String.fromCharCode( 97 + col )
    col_indicator.classList.add( 'col_indicator' )
    col_indicator.style.left = ( col * 90/8 + 7.75 ).toString() + 'vw'
    return col_indicator
  }

  setupBoard() {
    let board = document.getElementById( 'chess_board' )
    for( let row = 0 ; row < this.BOARD_SIZE; row++ ) {
      for( let col = 0 ; col < this.BOARD_SIZE; col++ ) {
        // add letters for columns
        if( row == 0 ) {
          let col_indicator = this.addColLetter( col )
          board.appendChild( col_indicator )
        }
        // add the squares for the board
        let square = this.createSquare( row, col )
        board.appendChild( square )
      }
      board.appendChild( document.createElement( 'br' ) )
      // add numbers for the rows
      let row_indicator = this.addRowNumber( row )
      board.appendChild( row_indicator )
    }
  }
}

export {Game_UI}