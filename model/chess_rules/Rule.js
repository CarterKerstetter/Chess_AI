class Rule {
    description = 'A chess validation rule.'

    constructor() {
    }

    isValid( board, turn, move, previous_move ) {
        return false
    }

    get description() {
        return this.description
    }
}

export { Rule }