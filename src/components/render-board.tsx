import DrawCell from "./render-cell";
import { ICell } from "./render-cell";
import { ISquare } from "./render-square";
import { Board } from "./compute-board";
import React from "react";

export interface IBoard {
    squaresMap: Map<number, ISquare>;
    cells?: Map<Number, ICell>;
}

// Initiate logic
const computeBoard = new Board();

const style: React.CSSProperties = {
    height: '750px',
    aspectRatio: '1',
    display: 'grid',
    gridTemplateRows: 'repeat(3, 1fr)',
    gridTemplateColumns: 'repeat(3, 1fr)'
}

// Render main
export function DrawBoard() {
    let cells: JSX.Element[] = [];
    for (let i = 0; i <= 8; i++) {
        let key = 'cell-' + (i - 1);
        cells.push(<DrawCell key={key} id={i} mainBoard={computeBoard} />)
    }

    return <>
        <div style={style}>
            {cells}
        </div>
    </>

}
