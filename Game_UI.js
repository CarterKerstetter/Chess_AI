class Game_UI{
  constructor() {
    this.setupBoard()
  }

  setupBoard() {
    var board = document.getElementById('chess_board')
    for( var x = 0 ; x < 8; x++ ) {
      for( var y = 0 ; y < 8; y++ ) {
        var square = document.createElement('img')
        square.classList.add('chess_square')
        var color = ( x + y ) % 2
        if(color == 0) {
          square.src = 'res/white.png'
        }
        else {
          square.src = 'res/black.png'
        }
        board.appendChild(square)
      }
      var new_line = document.createElement('br')
      board.appendChild(new_line)
    }
    for ( var row = 1 ; row <= 8 ; row++ ) {
      var row_indicator = document.createElement('div')
      row_indicator.innerHTML = row.toString()
      row_indicator.classList.add('row_indicator')
      row_indicator.style.top = ((row-1) * 90/8 + 7.75).toString() + 'vw'
      board.appendChild(row_indicator)
    }
  }
}

export {Game_UI}