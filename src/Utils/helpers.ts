import {CANVAS_LAYOUT, FILL_PERCENT} from '../Utils/consts';
import {Cell} from '../types/tileData';

export const generateGrid = (): Cell[][] => {
  const newData: Cell[][] = [];
  for (let i = 0; i < CANVAS_LAYOUT.NUM_COL; i++) {
    newData.push([]);
    for (let j = 0; j < CANVAS_LAYOUT.NUM_ROW; j++) {
      newData[i][j] = {
        content: Math.random() > FILL_PERCENT ? 1 : 0,
      };
    }
  }
  return newData;
};

const getCellCode = (i: number, j: number, grid: Cell[][]): number => {
  // We are taking only 5-neighbor rules for now
  // Todo : Add user input to chose which neighbors
  const neighbors = [
    [i - 1, j],
    [i, j - 1],
    [i, j],
    [i, j + 1],
    [i, j],
  ];
  let cell = '';
  for (const ngh of neighbors) {
    const [ngh_i, ngh_j] = ngh;
    if (
      ngh_i < 0 ||
      ngh_j < 0 ||
      ngh_i >= CANVAS_LAYOUT.NUM_COL ||
      ngh_j >= CANVAS_LAYOUT.NUM_ROW
    ) {
      // We consider out of bounds to be 1
      cell = cell.concat('0');
    } else {
      cell = cell.concat(grid[ngh_i][ngh_j].content.toString());
    }
  }
  return parseInt(cell, 2);
};

export const applyRule = (grid: Cell[][], rule: number): Cell[][] => {
  /*
    0 
  1 1 0 =  01100 = 12 => we check if  the 12 bit of rule is 1/0  
    0  
  So first thing, we iterate through the cells to get their code 
  Then we check the corresponding bit in the rule
  */
  const newData: Cell[][] = [];
  for (let i = 0; i < CANVAS_LAYOUT.NUM_COL; i++) {
    newData.push([]);
    for (let j = 0; j < CANVAS_LAYOUT.NUM_ROW; j++) {
      const cellCode = getCellCode(i, j, grid);
      let content: 1 | 0 = 1;
      if ((Math.pow(2, cellCode - 1) & rule) == 0) {
        content = 0;
      }
      newData[i][j] = {
        content,
      };
    }
  }
  return newData;
};
