import { useContext, useState } from "react";
import { useRef } from "react";
import { Board } from "./compute-board";
import { mapContext } from "../App";
import { memo } from "react";

export interface ISquare {
    localId: number;
    globalId?: number;
    column?: number;
    row?: number;
    parentCellId: number;
    superposition?: number[];
    entropy?: number;
    handleValue: Function;
    handleDebug: Function;
    handleDebugBorder: Function;
    handleHide: Function;
    reset: Function;
}

interface SquareProps {
    localId: number;
    parentCellId: number;
    mainBoard: Board;
}

const SUDOKU_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function DrawSquare(props: SquareProps) {
    // Initialize objects & variables
    let superposition = useRef(SUDOKU_NUMBERS)
    let entropy = useRef(superposition.current.length);

    const [debug, setDebug] = useState(SUDOKU_NUMBERS.length);
    const [debug2, setDebugBorder] = useState('1px solid grey');

    const [valueState, setValue] = useState(-1);
    const [hideState, setHide] = useState('');

    const _squareObj: ISquare = {
        parentCellId: props.parentCellId,
        localId: props.localId,
        row: calculateRow(props.localId, props.parentCellId),
        column: calculateColumn(props.localId, props.parentCellId),
        superposition: superposition.current,
        entropy: entropy.current,
        handleValue: handleValue,
        handleDebug: handleDebug,
        handleDebugBorder: handleDebugBorder,
        handleHide: handleHide,
        reset: reset
    }

    // Calculate global position
    _squareObj.globalId = calculateGlobalPosition(_squareObj.row, _squareObj.column);

    // Add this square to the global square map
    const mapFn = useContext(mapContext);
    mapFn(_squareObj);

    function handleValue(value: number) {
        setValue(value);
    }

    function handleDebug(value: number) {
        setDebug(value);
    }

    function handleDebugBorder(value: string) {
        setDebugBorder(value);
    }

    function handleHide(set: string) {
        setHide(set);
    }

    function reset() {
        handleValue(-1);
        handleDebug(SUDOKU_NUMBERS.length);
        setDebugBorder('1px solid grey');
        setHide('');
    }

    return <>
        <div className={hideState} style={{ transition: '.075s', outline: debug2, fontSize: '1.5em', fontWeight: '600', backgroundColor: '', display: 'flex', justifyContent: 'center', alignItems: 'center', color: valueState >= 1 ? 'white' : '#404040', position: 'relative' }}>
            {valueState! >= 0 ? valueState : debug}
        </div>
    </>
}

export const DrawSquareMemo = memo(DrawSquare);

export default DrawSquare;

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