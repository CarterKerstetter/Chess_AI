import { Theme } from './Theme.js'

class Chess_View {
  BOARD_SIZE = 8
  theme
  controller
  side

  constructor( controller ) {
    this.startGame = this.startGame.bind(this)
    this.addPiece = this.addPiece.bind(this)
    this.removePiece = this.removePiece.bind(this)
    this.selectSquare = this.selectSquare.bind(this)
    this.highlightSquare = this.highlightSquare.bind(this)
    this.controller = controller
  }

  run() {
    this.setupWindow()
    this.setupController()
    // this.controller.startGame()
    // this.addPiece( 'test', 'view/res/chess_pieces/black_bishop.png',2 , 4 )
    // this.addPiece( 'test2', 'view/res/chess_pieces/white_bishop.png',2 , 5 )
    // this.removePiece( 'test' )
  }

  startGame() {
    let ai_selector = document.getElementById( 'ai_type' )
    ai_selector.style.pointerEvents = 'none'
    let start_game_button = document.getElementById( 'game_start' )
    start_game_button.style.pointerEvents = 'none'
    this.side = this.controller.startGame()
  }

  endGame() {
    let ai_selector = document.getElementById( 'ai_type' )
    ai_selector.style.pointerEvents = 'auto'
    let start_game_button = document.getElementById( 'game_start' )
    start_game_button.style.pointerEvents = 'auto'

  }

  addPiece( id, img_src, row, col ) {
    let square_id = this.createSquareId(row, col)
    let square = document.getElementById( square_id )
    let piece = document.createElement( 'img' )
    piece.setAttribute('id', id)
    piece.setAttribute('src', img_src)
    piece.classList.add( 'chess_piece' )
    square.appendChild( piece )
  }

  removePiece( id ) {
    document.getElementById( id ).remove()
  }

  createSquareId(row, col) {
    return 'chess_square_'.concat( row.toString(), '_', col.toString() ) 
  }

  selectSquare( row, col ) {
    this.controller.selectSquare( row, col, this.side )
  } 

  highlightSquare( row, col ) {
    let square_id = this.createSquareId(row, col)
    let square = document.getElementById( square_id )
    square.classList.add('highlighted_chess_square')
  }

  createSquare( row, col ) {
    var self = this
    let square = document.createElement( 'div' )
    let color = ( row + col ) % 2
    if(color == 0) {
      square.classList.add( 'primary_chess_square' )
    }
    else {
      square.classList.add( 'secondary_chess_square' )
    }
    let id = this.createSquareId( row, col )
    square.setAttribute( 'id', id )
    let selectSquare = function() { self.selectSquare(row, col) }
    square.addEventListener( 'click', selectSquare )
    return square
  }

  addRowNumber( row ) {
    let row_indicator = document.createElement( 'div' )
    row_indicator.innerHTML = ( row + 1 ).toString()
    row_indicator.classList.add( 'row_indicator' )
    row_indicator.style.top = ( row * 90/8 + 9 ).toString() + 'vw'
    return row_indicator
  }

  addColLetter( col ) {
    let col_indicator = document.createElement( 'div' )
    col_indicator.innerHTML = String.fromCharCode( 97 + col )
    col_indicator.classList.add( 'col_indicator' )
    col_indicator.style.left = ( col * 90/8 + 9 ).toString() + 'vw'
    return col_indicator
  }

  setAi() {
    let ai_name = document.getElementById( 'ai_type' ).value
    this.controller.setAi( ai_name )
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
    let theme_selector = document.getElementById( 'board_style' )
    let theme_types = Theme.getThemeNames()
    for (let index = 0 ; index < theme_types.length ; index++ ) {
      let theme_type = theme_types [ index ]
      let option = document.createElement( 'option' )
      let theme_type_text = theme_type.charAt( 0 ).toUpperCase() + theme_type.slice( 1 ).toLowerCase()
      option.appendChild( document.createTextNode( theme_type_text ) )
      option.value = theme_type
      theme_selector.appendChild( option )
    }
    // create the board
    this.setupBoard()
    // set up the theme selector for on change event
    theme_selector.addEventListener( 'change', this.setTheme )
    // set theme selector to default
    theme_selector.value = 'DEFAULT'
    this.setTheme()

    // set up selector for ai types
    let ai_selector = document.getElementById( 'ai_type' )
    let ai_types = this.controller.AiNames
    for (let index = 0 ; index < ai_types.length ; index++ ) {
      let ai_type = ai_types [ index ]
      let option = document.createElement( 'option' )
      let ai_type_text = ai_type.charAt( 0 ).toUpperCase() + ai_type.slice( 1 ).toLowerCase()
      option.appendChild( document.createTextNode( ai_type_text ) )
      option.value = ai_type
      ai_selector.appendChild( option )
    }
    // set up the ai selector for on change event
    ai_selector.addEventListener( 'change', this.setAi )
    // set ai selector to default
    ai_selector.value = 'RANDOM'
    this.setAi()

    // set up start game button
    let start_game_button = document.getElementById( 'game_start' )
    start_game_button.addEventListener( 'click', this.startGame )
  }

  setupController() {
    this.controller.addListener( 'add_piece', this.addPiece )
    this.controller.addListener( 'remove_piece', this.removePiece )
    this.controller.addListener( 'highlight_square', this.highlightSquare )
  }
}

export { Chess_View }