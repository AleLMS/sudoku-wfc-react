import { DrawSquareMemo } from "./render-square";
import { useRef } from "react";
import { Board } from "./compute-board";

export interface ICell {
    id: number;
    squares?: Map<Number, JSX.Element>;
    mainBoard: Board;
}

const style: React.CSSProperties = {
    height: '100%',
    width: '100%',
    outline: '3px solid white',
    position: 'relative',
    zIndex: '5',
    padding: '0px',
    display: 'grid',
    gridTemplateRows: 'repeat(3, 1fr)',
    gridTemplateColumns: 'repeat(3, 1fr)',
}

function DrawCell(props: ICell) {
    const CELL_SIZE = 8;
    const squares = useRef([<></>]);
    squares.current = makeSquares(props.id);

    return <div className='' style={style}>
        {squares.current}
    </div>

    function makeSquares(parentId: number) {
        let squares: JSX.Element[] = [];
        for (let i = 0; i <= CELL_SIZE; i++) {
            let id = 'square-' + parentId + '-' + i;
            squares.push(<DrawSquareMemo key={id} localId={i} mainBoard={props.mainBoard} parentCellId={parentId}></DrawSquareMemo>);
        }
        return squares;
    }

}
export default DrawCell;