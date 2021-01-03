import React from 'react';
import {CANVAS_LAYOUT} from '../Utils/consts';
import './Grid.css';
import {Tile} from './Tile';
import {Cell} from 'src/types/tileData';

interface GridProps {
  seed: number;
  grid: Cell[][];
}
export const Grid: React.FC<GridProps> = ({seed, grid}) => {
  console.log(seed);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <div
      className="container"
      style={{
        height: CANVAS_LAYOUT.HEIGHT,
        width: CANVAS_LAYOUT.WIDTH,
      }}>
      {grid.map((row, i) => {
        return (
          <div key={`row${i}`} className="row-container">
            {row.map((cl, j) => {
              return <Tile key={10 * j + i} content={cl.content} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
