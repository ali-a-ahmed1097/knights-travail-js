const moves = [1, 2, -1, -2, -1, 2, 1, -2];

function createGameBoard(size) {
    let arr = [];
    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
            arr.push([i, j]);
    return arr;
}

const gameboard = createGameBoard(8);

class Graph {
    constructor() {
        this._gameboard = new Map();
        this.generate();
    }

    addSquare(coords) {
        this._gameboard.set(coords.toString(), []);
    }

    addEdge(square, edge) {
        let skip = this._gameboard.get(square.toString()).find(e => e === edge.toString());
        if (!skip) this._gameboard.get(square.toString()).push(edge.toString());

        skip = this._gameboard.get(edge.toString()).find(e => e === square.toString());
        if (!skip) this._gameboard.get(edge.toString()).push(square.toString());
    }

    generate() {
        for (let i = 0; i < gameboard.length; i++) {
            this.addSquare(gameboard[i]);
        }

        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < moves.length; j++) {
                let x = gameboard[i][0] + moves[j];
                let y = gameboard[i][1] + moves[j + 1];
                if (x >= 0 && x < 8 && y >= 0 && y < 8) this.addEdge(gameboard[i], [x, y]);

                x = gameboard[i][0] + moves[j + 1];
                y = gameboard[i][1] + moves[j];
                if (x >= 0 && x < 8 && y >= 0 && y < 8) this.addEdge(gameboard[i], [x, y]);
            }
        }
    }

    getGameBoard() { return this._gameboard; }
}

let g = new Graph();

function knightsTravail(start, end) {
    console.log(g.getGameBoard().get(start.toString()))
}