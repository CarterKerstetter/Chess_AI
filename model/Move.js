class Move {
    start_position
    end_position

    constructor(start_position, end_position) {
        this.start_position = start_position
        this.end_position = end_position
    }

    get start_position() {
        return this.start_position
    }

    get end_position() {
        return this.end_position
    }
}

export { Move }