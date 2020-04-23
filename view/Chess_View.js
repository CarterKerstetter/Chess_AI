import { Theme } from './Theme.js'

class Chess_View {
  BOARD_SIZE = 8
  theme

  constructor() {
    this.setupWindow()
  }

  createSquare( row, col ) {
    let square = document.createElement( 'div' )
    let color = ( row + col ) % 2
    if(color == 0) {
      square.classList.add( 'primary_chess_square' )
      //square.style.background = this.THEME.PRIMARY_COLOR
    }
    else {
      square.classList.add( 'secondary_chess_square' )
      //square.style.background = this.THEME.SECONDARY_COLOR
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

  setTheme() {
    let theme_name = document.getElementById( 'board_style' ).value
    this.theme = new Theme( theme_name )
    let primary_chess_squares = document.getElementsByClassName('primary_chess_square');
    let secondary_chess_squares = document.getElementsByClassName('secondary_chess_square');
    for(let index = 0; index < primary_chess_squares.length; index++) {
      primary_chess_squares[index].style.background = this.theme.PRIMARY_COLOR
    }
    for(let index = 0; index < secondary_chess_squares.length; index++) {
      secondary_chess_squares[index].style.background = this.theme.SECONDARY_COLOR
    }
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

  setupWindow() {
    // set up selector for board styles
    let selector = document.getElementById( 'board_style' )
    let theme_types = Theme.getThemeNames()
    for (let index = 0 ; index < theme_types.length ; index++ ) {
      let theme_type = theme_types [ index ]
      let option = document.createElement( 'option' )
      option.appendChild( document.createTextNode( theme_type ) )
      option.value = theme_type
      selector.appendChild(option)
    }
    // create the board
    this.setupBoard()
    // set up the default board theme
    this.setTheme( new Theme() )
    // set up selector to be able to change the theme
    selector.addEventListener('change', this.setTheme)
  }
}

export { Chess_View }