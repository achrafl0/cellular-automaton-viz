import React from 'react';
import {CELL_LAYOUT} from '../Utils/consts';
import './Tile.css';

type Props = {
  layout: any;
  backgroundColor: 'white' | 'black' | 'red';
  onClick: () => void;
};

export const Tile: React.FC<Props> = ({layout, backgroundColor, onClick}) => {
  return (
    <div
      className="tile"
      onClick={onClick}
      style={{
        width: CELL_LAYOUT(layout).CELL_WIDTH,
        height: CELL_LAYOUT(layout).CELL_HEIGHT,
        backgroundColor,
      }}
    />
  );
};
