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

export const applyRule = (grid: Cell[][], rule: number): Cell[][] => {
  /*
    0 
  1 1 0 =  01100 = 12 => we check if  the 12 bit of rule is 1/0  
    0  
  So first thing, we iterate through the cells to get their code 
  Then we check the corresponding bit 
  */
  return [];
};
