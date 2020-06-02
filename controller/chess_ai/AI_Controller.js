import { Random } from './Random.js';

const AI_TYPES = {
    RANDOM:     new Random()
}

class AI_Controller {
    ai

    constructor() {
    }

    setAi( type ) {
        this.ai = AI_TYPES[ type ]
    }

    static getAiNames() {
        return Object.keys(AI_TYPES)
    }

    makeMove( board, side ) {
        this.ai.makeMove( board, side )
    }

}

export { AI_Controller }