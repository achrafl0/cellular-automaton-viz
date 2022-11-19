import React from 'react';
import './Grid.css';
import {Tile} from './Tile';
import {Cell} from 'src/types/tileData';
import {Layout} from 'src/Utils/consts';

interface GridProps {
  grid: Cell[][];
  toggle: (i: number, j: number) => () => void;
  layout: Layout;
}
export const Grid: React.FC<GridProps> = ({grid, toggle, layout}) => {
  const getBgColor = (i: number, j: number) => {
    if (grid[i][j].content === 1) {
      return '#624F82'; // Alive cells
    }
    const {NUM_COL, NUM_ROW} = layout;
    const rowCenter = (NUM_ROW - 1) / 2;
    const colCenter = (NUM_COL - 1) / 2;
    const coloredRow = new Set([Math.floor(rowCenter), Math.ceil(rowCenter)]);
    const coloredCol = new Set([Math.floor(colCenter), Math.ceil(colCenter)]);
    if (coloredCol.has(j) && coloredRow.has(i)) {
      return '#9F73AB'; // center cells
    }
    return '#A3C7D6'; // Dead cells
  };
  return (
    <div
      className="container"
      style={{
        height: layout.HEIGHT,
        width: layout.WIDTH,
      }}
    >
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
