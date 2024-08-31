import { Square } from "./compute-square";
import { Board } from "./compute-board";

export class Cell {
    public squares: Square[] | undefined;
    public cellId: number | undefined;
    public self = this;
    public parent: Board | undefined;

    constructor(cellId: number, parent: Board) {
        this.cellId = cellId;
        this.parent = parent;

        this.squares = this.initSquares();
    }

    initSquares() {
        let squares: Square[] = [];
        for (let i = 0; i <= 8; i++) {
            squares.push(new Square(i, this.cellId!, this.self));
        }
        return squares;
    }
}
