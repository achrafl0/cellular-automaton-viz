import React, {useState} from 'react';
import {generateGrid, applyRule} from 'src/Utils/helpers';
import {Grid} from '../Components/Grid';
import './Homeview.css';
export const Homeview: React.FC = () => {
  const [grid, setGrid] = useState(generateGrid);
  const [rule, setRule] = useState(Math.floor(Math.random() * 4294967295));
  return (
    <div className="homeview-container">
      <h1>Cellular Automaton Viz</h1>
      <input
        type="text"
        name="rule"
        value={rule}
        onChange={(e) => setRule(parseInt(e.target.value))}
      />
      <button onClick={() => setGrid(generateGrid())}>Generate new grid</button>
      <button onClick={() => setGrid(applyRule(grid, rule))}>Apply rule</button>
      <Grid grid={grid} />
    </div>
  );
};
