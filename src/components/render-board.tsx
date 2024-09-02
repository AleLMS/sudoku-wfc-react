import DrawCell from "./render-cell";
import { ICell } from "./render-cell";
import { ISquare } from "./render-square";
import { Board } from "./compute-board";
import { sleep } from "./helper-functions";
import Controls from "./controls";

export interface IBoard {
    squaresMap: Map<number, ISquare>;
    setGlobalSquare?: Function;
    cells?: Map<Number, ICell>;
}



export function DrawBoard() {
    const computeBoard = new Board();
    const boardRenderer: IBoard = {
        squaresMap: new Map(),
    }

    let cells: JSX.Element[] = [];
    for (let i = 0; i <= 8; i++) {
        let key = 'cell-' + (i - 1);
        cells.push(<DrawCell key={key} id={i} mainBoard={computeBoard} setFn={mapSquare}></DrawCell>)
    }


    return <>
        <div style={{ height: '75svh', aspectRatio: '1', display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {cells}
        </div>
        <Controls generate={generate} handleSleepChange={null}></Controls>
    </>

    // FUNCTIONS
    function mapSquare(square: ISquare) {
        if (square.globalId === undefined) return;
        boardRenderer.squaresMap.set(square.globalId, square);
    }

    function resetBoard() {
        boardRenderer.squaresMap.forEach(function (square) {
            square.reset();
        });
        computeBoard.squareMap.forEach(function (square) {
            square.reset();
        });
    }

    async function generate(controls: { delay: number, lock: boolean }) {
        if (controls.lock === true) return; // Already running 


        controls.lock = true;
        resetBoard();
        let done = false;
        mainloop: while (!done) {
            for (let i = 0; i <= 80; i++) {
                try {
                    let sqr = computeBoard.RunWFCStep();
                    let squareRender = boardRenderer.squaresMap.get(sqr.globalId!);
                    squareRender?.handleValue(sqr.value);

                    // DEBUG
                    boardRenderer.squaresMap.forEach(function (square) {
                        square.handleDebugBorder('1px solid grey');

                        if (sqr.column === square.column || sqr.row === square.row || sqr.parentCell?.cellId === square.parentCellId) {
                            square.handleDebugBorder('3px solid cyan');
                        }

                        let entropyData = computeBoard.squareMap.get(square.globalId!)?.superposition.length;
                        square.handleDebug(entropyData);
                    });
                    // DEBUG END

                    // SLEEP
                    if (controls.delay > 0)
                        await sleep(controls.delay);
                } catch (e) {
                    // reset on error and try again
                    resetBoard();
                    continue mainloop;
                }
            }
            done = true;
        }

        // CLEAR DEBUG
        boardRenderer.squaresMap.forEach(function (square) {
            square.handleDebugBorder('1px solid grey');
        });

        controls.lock = false; // Reset lock
        return false;
    }
}
