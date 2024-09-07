import './App.css'
import { DrawBoard, IBoard } from './components/render-board';
import { ISquare } from './components/render-square';
import { Board } from './components/compute-board';
import { getRandomInt } from './components/math-helpers';
import { sleep } from './components/helper-functions';
import { createContext } from 'react';
import Controls from './components/controls';

// Initiate objects
// Initiate logic
const computeBoard = new Board();
// Initiate renderer data
const boardRenderer: IBoard = {
  squaresMap: new Map()
}

const SUDOKU_BOARD_SIZE = 81;

// Render
function App() {
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

// ==== FUNCTIONS ====
// Map square renderers 
function mapSquare(square: ISquare) {
  if (square.globalId === undefined) return;
  boardRenderer.squaresMap.set(square.globalId, square);
}
export const mapContext = createContext(mapSquare);

// Reset the board logic and renderer objects to their initial values
function resetBoard() {
  boardRenderer.squaresMap.forEach(function (square) {
    square.reset();
  });
  computeBoard.squareMap.forEach(function (square) {
    square.reset();
  });
}

// Hide given amount of random squares
function hideSquares(amount: number) {
  let spent: number[] = [];
  while (spent.length < amount) {
    let num = getRandomInt(SUDOKU_BOARD_SIZE);
    if (spent.indexOf(num) === -1) {
      spent.push(num);
      boardRenderer.squaresMap.get(num)?.handleHide('hidden-square');
    }
  }
}

// Run logic and render the results
async function generate(controls: { delay: number, lock: boolean, hide: number }) {
  // Already running, do not allow running two instances at once
  if (controls.lock === true) return;
  controls.lock = true;
  // Reset board upon new generation request
  resetBoard();

  // Keep trying until successful solve
  let done = false;
  mainloop: while (!done) {
    for (let i = 0; i < SUDOKU_BOARD_SIZE; i++) {
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

        // Add pause between each loop to help with visualization
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

  // Open lock
  controls.lock = false;
  return false;
}
