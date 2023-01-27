const moves = [1, 2, -1, -2, -1, 2, 1, -2];
const SIZE = 8;

function createGameBoard(size) {
    let arr = [];
    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
            arr.push([i, j]);
    return arr;
}

const gameboard = createGameBoard(SIZE);

class Graph {
    constructor() {
        this._gameboard = new Map();
        this.generate();
    }

    addSquare(coords) { this._gameboard.set(coords.toString(), []); }

    addEdge(square, edge) {
        let skip = this._gameboard.get(square.toString()).find(e => e === edge.toString());
        if (!skip) this._gameboard.get(square.toString()).push(edge.toString());

        skip = this._gameboard.get(edge.toString()).find(e => e === square.toString());
        if (!skip) this._gameboard.get(edge.toString()).push(square.toString());
    }

    generate() {
        gameboard.forEach(sq => this.addSquare(sq));

        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < moves.length; j++) {
                let x = gameboard[i][0] + moves[j];
                let y = gameboard[i][1] + moves[j + 1];
                if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) this.addEdge(gameboard[i], [x, y]);

                x = gameboard[i][0] + moves[j + 1];
                y = gameboard[i][1] + moves[j];
                if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) this.addEdge(gameboard[i], [x, y]);
            }
        }
    }

    getGameBoard() { return this._gameboard; }
}

let g = new Graph();

function knightsTravail(start, end) {
    let visited = [];
    let queue = [[0, start.toString()]];

    while (queue.length > 0) {
        let currentSquare = queue.shift();

        let skip = visited.find(s => s[1] === currentSquare[1]);

        if (!skip) {
            if (currentSquare[1] === end.toString()) {
                console.log(`You made it in ${currentSquare[0]} moves! Here's your path:`);
                let arr = [currentSquare[1]];

                while (currentSquare[1] !== start.toString()) {
                    let e = g.getGameBoard().get(currentSquare[1]);
                    currentSquare = visited.find(edge =>
                        (edge[0] === currentSquare[0] - 1 && e.includes(edge[1])));

                    arr.unshift(currentSquare[1]);
                }

                arr.forEach(square => console.log(`[${square}]`));
                return;
            }

            let edges = g.getGameBoard().get(currentSquare[1]);
            for (let i = 0; i < edges.length; i++) {
                queue.push([currentSquare[0] + 1, edges[i]]);
            }

            visited.push(currentSquare);
        }
    }
}