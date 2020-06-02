class Rule {
    description = 'A chess rule.'

    constructor() {
    }

    isValid( board, turn, move ) {
        return true
    }

    get description() {
        return this.description
    }
}

export { Rule }