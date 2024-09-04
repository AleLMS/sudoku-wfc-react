import { Square } from "./compute-square";
import { Board } from "./compute-board";

export class Cell {
    public squares: Square[] | undefined;
    public cellId: number;
    public self = this;
    public parent: Board;

    constructor(cellId: number, parent: Board) {
        this.cellId = cellId;
        this.parent = parent;

        this.squares = this.initiateSquares();
    }

    initiateSquares() {
        let squares: Square[] = [];
        for (let i = 0; i <= 8; i++) {
            squares.push(new Square(i, this.cellId!, this.self));
        }
        return squares;
    }
}
