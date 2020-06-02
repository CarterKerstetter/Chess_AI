class Chess_Piece {
    img_src
    piece_number
    side
    id
    piece_type
    has_moved

    constructor(piece_type, piece_number, side) {
        this.img_src = 'view/res/chess_pieces/'.concat(side, '_', piece_type, '.png')
        this.piece_number = piece_number
        this.side = side
        this.id = side.concat('_', piece_type, '_', piece_number.toString())
        this.piece_type = piece_type
        this.has_moved = false
    }

    isValidMove( move ) {
        return false
    }

    set has_moved( has_moved ) {
        this.has_moved = has_moved
    }

    get img_src() {
        return this.img_src
    }

    get id() {
        return this.id
    }

    get side() {
        return this.side
    }
}

export { Chess_Piece }