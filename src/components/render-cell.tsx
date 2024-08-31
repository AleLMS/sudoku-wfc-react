import DrawSquare from "./render-square";
import { useRef } from "react";
import { Board } from "./compute-board";

export interface ICell {
    id: number;
    squares?: Map<Number, JSX.Element>;
    setFn?: CallableFunction;
    mainBoard: Board;
}

function DrawCell(props: ICell) {
    console.log('cell-' + props.id + " rendered!");

    const squares = useRef([<></>]);
    squares.current = makeSquares(props.id);

    return <div className='' style={{
        height: '100%', width: '100%', border: '1px solid white', padding: '0px',
        display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gridTemplateColumns: 'repeat(3, 1fr)',
    }}>
        {squares.current}
    </div>

    function makeSquares(parentId: number) {
        let squares: JSX.Element[] = [];
        for (let i = 0; i <= 8; i++) {
            let id = 'square-' + parentId + '-' + i;
            squares.push(<DrawSquare key={id} localId={i} mainBoard={props.mainBoard} parentCellId={parentId} setFn={props.setFn}></DrawSquare>);
        }
        return squares;
    }

}
export default DrawCell;