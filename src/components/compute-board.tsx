import { Cell } from "./compute-cell";
import { Square } from "./compute-square";
import { getRandomInt } from "./math-helpers";

export class Board {
    public cellMap: Map<number, Cell> = new Map();
    public squareMap: Map<number, Square> = new Map();
    public self = this;

    constructor() {
        this.initCells(this.cellMap);

        console.log(this.squareMap);
    }

    initCells(map: Map<number, Cell>) {
        for (let i = 0; i <= 8; i++) {
            map.set(i, new Cell(i, this.self));
        }
    }

    addSquareToMap(globalPos: number, square: Square) {
        if (this.squareMap.has(globalPos)) return;
        this.squareMap.set(globalPos, square);
    }

    RunWFCStep() {
        // Get the square with the lowest entropy
        let nextSquare: Square = this.getLowestEntropy(this.squareMap);
        // Set value of the square
        let chosenValue = nextSquare.setRandomValue();
        // Propagate compatibility rules
        this.propagateRules(this.squareMap, nextSquare, chosenValue);

        return nextSquare;
    }

    propagateRules(squareMap: Map<number, Square>, nextSquare: Square, chosenValue: number) {
        squareMap.forEach(function (square) {
            if (square.row === nextSquare.row || square.column === nextSquare.column || square.parentCell?.cellId === nextSquare.parentCell?.cellId) {
                console.log(square.parentCell);
                square.diminishPossiblities(chosenValue);
                if (square.entropy! <= 0) throw new Error("Couldn't solve!");
            }
        });
    }

    getLowestEntropy(squareMap: Map<number, Square>) {
        let lowestEntropy = Infinity;
        let possibleSquares: Square[] = [];

        squareMap.forEach(function (square) {
            // update entropies?
            // Skip conditions
            if (square.spent) return;
            if (square.entropy! > lowestEntropy) return;

            // Empty array if new lowest found
            if (square.entropy !== lowestEntropy)
                possibleSquares = [];

            lowestEntropy = square.entropy!;
            possibleSquares.push(square);
        });

        //console.log(possibleSquares);
        // Return random square of the possible ones
        return possibleSquares[getRandomInt(possibleSquares.length)];
    }

}
