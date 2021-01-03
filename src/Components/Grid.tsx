import React from 'react';
import {CANVAS_LAYOUT} from '../Utils/consts';
import './Grid.css';
import {Tile} from './Tile';
import {Cell} from 'src/types/tileData';

interface GridProps {
  grid: Cell[][];
}
export const Grid: React.FC<GridProps> = ({grid}) => {
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
