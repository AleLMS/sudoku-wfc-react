import './App.css'
import { DrawBoard, IBoard } from './components/render-board';
import { ISquare } from './components/render-square';
import { Board } from './components/compute-board';
import { getRandomInt } from './components/math-helpers';
import { sleep } from './components/helper-functions';
import { createContext } from 'react';
import Controls from './components/controls';

// Initiate logic
const computeBoard = new Board();
// Initiate renderer data
const boardRenderer: IBoard = {
  squaresMap: new Map()
}

function App() {
  // RENDER
  return (
    <>
      <mapContext.Provider value={mapSquare}>
        <DrawBoard></DrawBoard>
      </mapContext.Provider>
      <Controls generate={generate} handleSleepChange={null}></Controls>
    </>
  )
}

export default App

function mapSquare(square: ISquare) {
  if (square.globalId === undefined) return;
  boardRenderer.squaresMap.set(square.globalId, square);
}
export const mapContext = createContext(mapSquare);

function resetBoard() {
  boardRenderer.squaresMap.forEach(function (square) {
    square.reset();
  });
  computeBoard.squareMap.forEach(function (square) {
    square.reset();
  });
}

function hideSquares(amount: number) {
  let spent: number[] = [];
  while (spent.length < amount) {
    let num = getRandomInt(81);
    if (spent.indexOf(num) === -1) {
      spent.push(num);
      boardRenderer.squaresMap.get(num)?.handleHide('hidden-square');
    }
  }
}

// Run logic and render the results
async function generate(controls: { delay: number, lock: boolean, hide: number }) {
  if (controls.lock === true) return; // Already running, do not allow running two instances at once

  controls.lock = true;

  resetBoard();

  let done = false;
  mainloop: while (!done) {
    for (let i = 0; i <= 80; i++) {
      try {
        let sqr = computeBoard.solveSquare();
        let squareRender = boardRenderer.squaresMap.get(sqr.globalId!);
        squareRender?.handleValue(sqr.value);

        // DEBUG / VISUALIZE GENERATION
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

  // Call hide
  hideSquares(controls.hide);

  controls.lock = false; // Reset lock
  return false;
}
