import {CANVAS_LAYOUT, FILL_PERCENT} from '../Utils/consts';
import {Cell} from '../types/tileData';

export const generateGrid =
  (
    fillPercent: number = FILL_PERCENT,
    numCol: number = CANVAS_LAYOUT.NUM_COL,
    numRow: number = CANVAS_LAYOUT.NUM_ROW,
  ) =>
  (): Cell[][] => {
    const newData = Array(numRow)
      .fill(null)
      .map((_row) => {
        return Array(numCol)
          .fill(null)
          .map((_cell): Cell => {
            return {content: Math.random() < fillPercent ? 1 : 0};
          });
      });
    return newData;
  };

const flipCell = (oldCell: Cell): Cell => {
  // 0 ^ 1 = 1 ; 1 ^ 1 = 0
  const content = (oldCell.content ^ 1) as 0 | 1;

  return {
    content,
  };
};

export const toggleCell =
  (grid: Cell[][], running: boolean, setGrid: (grid: Cell[][]) => void) =>
  (replacedI: number, replacedJ: number) =>
  (): void => {
    if (running) {
      return;
    }
    const newGrid = grid.map((row, i) => {
      if (i !== replacedI) {
        return row;
      }
      return row.map((cell, j) => {
        if (j !== replacedJ) {
          return cell;
        }
        return flipCell(cell);
      });
    });
    setGrid(newGrid);
  };

/*
 *
 *  0 1 0
 *  1 1 1  : 010 111 010 => 186 : neighborRule , so neighborRule < 2^9 - 1
 *  0 1 0
 *
 */

const getNeighbors = (i: number, j: number) => {
  return [
    [i + 1, j + 1],
    [i + 1, j],
    [i + 1, j - 1],
    [i, j + 1],
    [i, j],
    [i, j - 1],
    [i - 1, j + 1],
    [i - 1, j],
    [i - 1, j - 1],
  ];
};

const computeCellCode =
  (neighborRule: number) =>
  (grid: Cell[][]) =>
  (i: number, j: number): number => {
    const neighbors = getNeighbors(i, j);
    const cellCode: number = neighbors.reduce((prv, [nghI, nghJ], k) => {
      if (
        nghI < 0 ||
        nghJ < 0 ||
        nghI >= CANVAS_LAYOUT.NUM_COL ||
        nghJ >= CANVAS_LAYOUT.NUM_ROW
      ) {
        // if it's out of bounds it's considered as dead, no wrap-around
        return prv;
      }
      // const isNghRelevant = ruleBitwise(neighborRule, k);
      return prv + grid[nghI][nghJ].content; // * isNghRelevant;
    }, 0);
    return cellCode;
  };

const ruleBitwise = (rule: number, power: number): 0 | 1 => {
  return (Math.pow(2, power) & rule) === 0 ? 0 : 1;
};

export const randomPower = (bits: number): number => {
  return Math.floor(Math.random() * (Math.pow(2, bits) - 1));
};

export const computeNeighborRule = (neighborGrid: Cell[][]) => {
  const neighbors = getNeighbors(1, 1);
  const neighborRule: number = neighbors.reduce((prv, [nghI, nghJ], k) => {
    return prv + neighborGrid[nghI][nghJ].content * Math.pow(2, k);
  }, 0);
  return neighborRule;
};

/*
 *  000
 *  000 : code = 1
 *  001
 *
 */

/*
 *
 *  0000000010 : if you have 1 neighbor : you live/stay alive, else rip , la rule : 2
 *
 *
 */

export const applyRule =
  (rule: number, neighborRule = 186) =>
  (grid: Cell[][]): Cell[][] => {
    /*
  0 1 0
  0 1 1 : CellCode 3 ( if nghbourRule = 186 )
  0 0 0
  rule : 000 001 000 =
  So first thing, we iterate through the cells to get their code
  Then we check the corresponding bit in the rule
  */
    return grid.map((row, i) => {
      return row.map((_cell, j) => {
        const cellCode = computeCellCode(neighborRule)(grid)(i, j);
        const newCell: Cell = {
          content: ruleBitwise(rule, cellCode),
        };
        return newCell;
      });
    });
  };
