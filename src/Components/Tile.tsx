import React from 'react';
import {Cell} from '../types/tileData';
import {CELL_LAYOUT} from '../Utils/consts';
import './Tile.css';
export const Tile: React.FC<Cell> = ({content}) => {
  return (
    <div
      className="tile"
      style={{
        width: CELL_LAYOUT.CELL_WIDTH,
        height: CELL_LAYOUT.CELL_HEIGHT,
        backgroundColor: content == 1 ? 'black' : 'white',
      }}
    />
  );
};
