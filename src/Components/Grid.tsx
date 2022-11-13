import React from 'react';
import './Grid.css';
import {Tile} from './Tile';
import {Cell} from 'src/types/tileData';

interface GridProps {
  grid: Cell[][];
  toggle: (i: number, j: number) => () => void;
  layout: {
    NUM_COL: number;
    NUM_ROW: number;
    HEIGHT: number;
    WIDTH: number;
  };
}
export const Grid: React.FC<GridProps> = ({grid, toggle, layout}) => {
  const getBgColor = (i: number, j: number) => {
    if (grid[i][j].content === 1) {
      return 'black';
    }
    const {NUM_COL, NUM_ROW} = layout;
    const rowCenter = (NUM_ROW - 1) / 2;
    const colCenter = (NUM_COL - 1) / 2;
    const coloredRow = new Set([Math.floor(rowCenter), Math.ceil(rowCenter)]);
    const coloredCol = new Set([Math.floor(colCenter), Math.ceil(colCenter)]);
    if (coloredCol.has(j) && coloredRow.has(i)) {
      return 'red';
    }
    return 'white';
  };
  return (
    <div
      className="container"
      style={{
        height: layout.HEIGHT,
        width: layout.WIDTH,
      }}>
      {grid.map((row, i) => {
        return (
          <div key={`row${i}`} className="row-container">
            {row.map((cl, j) => {
              return (
                <Tile
                  key={10 * j + i}
                  layout={layout}
                  backgroundColor={getBgColor(i, j)}
                  onClick={toggle(i, j)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
