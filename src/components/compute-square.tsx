import { Board } from "./compute-board";
import { Cell } from "./compute-cell";
import { removeValueFromArray } from "./helper-functions";
import { getRandomInt } from "./math-helpers";

export class Square {
    public row: number | undefined;
    public column: number | undefined;
    public globalId: number | undefined;
    public value: number | undefined;
    public entropy: number | undefined;
    public superposition: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    public self = this;
    public spent = false;

    public parentCell: Cell | undefined;
    public parentBoard: Board | undefined;

    constructor(localId: number, cellId: number, parent: Cell) {
        this.row = calculateRow(localId, cellId);
        this.column = calculateColumn(localId, cellId);
        this.globalId = calculateGlobalPosition(this.row, this.column);
        this.value = undefined;

        this.parentCell = parent;
        this.parentBoard = parent.parent;

        parent.parent?.addSquareToMap(this.globalId, this.self);
    }

    setRandomValue() {
        let random = getRandomInt(this.superposition.length)
        let value = this.superposition[random];
        this.setConsumed();
        this.value = value;
        return value;
    }

    setConsumed() {
        this.spent = true;
        this.entropy = Infinity;
        this.superposition = [];
    }

    diminishPossiblities(value: number) {
        this.superposition = removeValueFromArray(this.superposition, value);
        if (!this.spent)
            this.updateEntropy();
    }

    updateEntropy() {
        this.entropy = this.superposition.length;
    }

    reset() {
        this.value = undefined;
        this.superposition = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.spent = false;
        this.updateEntropy();
    }
}

function calculateRow(localId: number, cellId: number) {
    // Calculate row within cell
    let localRow = Math.ceil((localId + 1) * 0.33 - 1);
    // Convert local row to global row
    let row = localRow + Math.ceil((cellId + 1) * 0.33 - 1) * 3;
    return row;
}

function calculateColumn(localId: number, cellId: number) {
    // Calculate local column
    let localColumn = (cellId % 3) * 3
    // Convert local column to global column
    let column = localColumn + (localId % 3);
    return column;
}

function calculateGlobalPosition(row?: number, column?: number) {
    if (row == undefined || column == undefined) return -1;
    return row * 9 + column;
}