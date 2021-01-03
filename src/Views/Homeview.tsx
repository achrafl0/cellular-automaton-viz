import React, {useState} from 'react';
import {generateGrid} from 'src/Utils/helpers';
import {Grid} from '../Components/Grid';
import './Homeview.css';
export const Homeview: React.FC = () => {
  const [grid, setGrid] = useState(generateGrid);
  return (
    <div className="homeview-container">
      <h1>Cellular Automaton Viz</h1>
      <button onClick={() => setGrid(generateGrid())}>Generate new grid</button>
      <Grid seed={333} grid={grid} />
    </div>
  );
};
