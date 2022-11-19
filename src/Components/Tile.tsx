import React from 'react';
import {CELL_LAYOUT, Layout} from '../Utils/consts';
import './Tile.css';

type Props = {
  layout: Layout;
  backgroundColor: string;
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
