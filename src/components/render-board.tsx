import DrawCell from "./render-cell";
import { ICell } from "./render-cell";
import { ISquare } from "./render-square";
import { Board } from "./compute-board";

export interface IBoard {
    squaresMap: Map<number, ISquare>;
    setGlobalSquare?: Function;
    cells?: Map<Number, ICell>;
}

// Initiate logic
const computeBoard = new Board();

// Render main
export function DrawBoard() {
    let cells: JSX.Element[] = [];
    for (let i = 0; i <= 8; i++) {
        let key = 'cell-' + (i - 1);
        cells.push(<DrawCell key={key} id={i} mainBoard={computeBoard}></DrawCell>)
    }

    return <>
        <div style={{ height: '750px', aspectRatio: '1', display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {cells}
        </div>
    </>

}
