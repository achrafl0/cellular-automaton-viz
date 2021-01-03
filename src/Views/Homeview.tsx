import React, {useCallback, useRef, useState} from 'react';
import {generateGrid, applyRule} from 'src/Utils/helpers';
import {Grid} from '../Components/Grid';
import './Homeview.css';
export const Homeview: React.FC = () => {
  const [grid, setGrid] = useState(generateGrid);
  const [rule, setRule] = useState(Math.floor(Math.random() * 4294967295));
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;
  const applyRuleGrid = () => {
    setGrid(applyRule(grid, rule));
  };
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => applyRule(g, rule));
    setTimeout(runSimulation, Math.floor(1000 / 30));
  }, []);
  const handleRuleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseInt(e.target.value);
    if (isNaN(input)) {
      setRule(0);
    } else {
      setRule(input);
      console.log(rule);
    }
  };
  return (
    <div className="homeview-container">
      <h2>Cellular Automaton Viz</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <input
          type="text"
          name="rule"
          value={rule}
          onChange={handleRuleInputChange}
        />
        <button onClick={() => setGrid(generateGrid())}>
          Generate new grid
        </button>
        <button onClick={applyRuleGrid} disabled={running}>
          Apply rule manually
        </button>
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}>
          {running ? 'Stop' : 'Apply rule automatically'}
        </button>
      </div>
      <Grid grid={grid} />
    </div>
  );
};
