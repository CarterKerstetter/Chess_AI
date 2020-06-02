class Position {
    row
    col

    constructor(row, col) {
        this.row = row
        this.col = col
    }

    get row() {
        return this.row
    }

    get col() {
        return this.col
    }
}

export { Position }