import React, {useEffect, useState} from 'react';
import {
  FILL_PERCENT,
  MAX_NEIGHBOURS_DISPOSITION,
  FRAME_RATE,
  CANVAS_LAYOUT,
  NGH_LAYOUT,
} from 'src/Utils/consts';
import {
  generateGrid,
  applyRule,
  toggleCell,
  randomPower,
  computeNeighborRule,
} from 'src/Utils/helpers';
import {useInterval} from 'src/Utils/useInterval';
import {Grid} from '../Components/Grid';
import './Homeview.css';
import {add} from 'breath';

export const Homeview: React.FC = () => {
  const [rule, setRule] = useState(randomPower(MAX_NEIGHBOURS_DISPOSITION));
  const [fillPercent, setFillPercent] = useState(FILL_PERCENT);
  const [grid, setGrid] = useState(generateGrid(fillPercent));
  const [nghGrid, setNghGrid] = useState(generateGrid(0, 3, 3));
  const [nghRule, setNghRule] = useState(186);

  useEffect(() => {
    setNghRule(computeNeighborRule(nghGrid));
  }, [nghGrid]);

  const applyRuleGrid = () => {
    setGrid(applyRule(rule, nghRule));
  };

  /* Animation */
  const [running, setRunning] = useState(false);
  const [frameRate, setFrameRate] = useState(FRAME_RATE);
  useInterval(
    () => {
      applyRuleGrid();
    },
    running ? Math.floor(1000 / FRAME_RATE) : null,
  );

  const handleFrameRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseInt(e.target.value);
    if (isNaN(input) || input < 0 || input > 120) {
      setFrameRate(FRAME_RATE);
    } else {
      setFrameRate(input);
    }
  };
  /* Input */

  const handleRuleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseInt(e.target.value);
    if (isNaN(input) || input < 0 || input > Math.pow(2, 10) - 1) {
      setRule(0);
    } else {
      setRule(input);
    }
  };
  /*
  const _handleFillPercentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseFloat(e.target.value);
    if (isNaN(input)) {
      setFillPercent(FILL_PERCENT);
    } else {
      setFillPercent(input);
    }
  };
  */
  const generateNewRule = () => {
    setRule(randomPower(MAX_NEIGHBOURS_DISPOSITION));
  };

  return (
    <div className="homeview-container">
      <h2>Cellular Automaton Viz</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <label>
          Rule :
          <input
            type="text"
            name="rule"
            value={rule}
            onChange={handleRuleInputChange}
            disabled={running}
          />
        </label>
        <button onClick={generateNewRule} disabled={running}>
          Generate new Rule
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <button onClick={() => setGrid(generateGrid(fillPercent)())}>
          Generate new grid
        </button>
        <button onClick={() => setGrid(generateGrid(0)())}>Empty grid</button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '30px',
        }}>
        <label>
          Framerate :{' '}
          <input
            type="number"
            name="Frame Rate"
            min="1"
            max="120"
            value={frameRate}
            onChange={handleFrameRateChange}
          />
        </label>
      </div>
      <h3>Neighbors:{'\n '}</h3>
      Neighbor Rule: {nghRule}
      <Grid
        grid={nghGrid}
        toggle={toggleCell(nghGrid, running, setNghGrid)}
        layout={NGH_LAYOUT}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <button onClick={applyRuleGrid} disabled={running}>
          Apply rule manually
        </button>
        <button
          onClick={() => {
            setRunning(!running);
          }}>
          {running ? 'Stop' : 'Apply rule automatically'}
        </button>
      </div>
      <h3>Automata: </h3>
      Rule : {rule.toString(2)}
      <Grid
        grid={grid}
        toggle={toggleCell(grid, running, setGrid)}
        layout={CANVAS_LAYOUT}
      />
    </div>
  );
};
