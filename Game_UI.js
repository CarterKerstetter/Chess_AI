class Game_UI{
  constructor() {
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
  }
}

export {Game_UI}