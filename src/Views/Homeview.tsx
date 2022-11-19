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
  ruleToGrid,
} from 'src/Utils/helpers';
import {useInterval} from 'src/Utils/useInterval';
import {Grid} from '../Components/Grid';
import './Homeview.css';
import {
  Box,
  Button,
  Fab,
  Modal,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import BorderClearIcon from '@mui/icons-material/BorderClear';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import BuildIcon from '@mui/icons-material/Build';
import queryString from 'query-string';

type AppParams = {
  rule?: number | null;
  neighbors?: number | null;
};

export const Homeview: React.FC = () => {
  const [rule, setRule] = useState(randomPower(MAX_NEIGHBOURS_DISPOSITION));
  const [fillPercent, setFillPercent] = useState(FILL_PERCENT);
  const [grid, setGrid] = useState(generateGrid(fillPercent));
  const [nghGrid, setNghGrid] = useState(generateGrid(0.5, 3, 3));
  const [nghRule, setNghRule] = useState(186);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setNghRule(computeNeighborRule(nghGrid));
  }, [nghGrid]);

  const applyRuleGrid = () => {
    setGrid(applyRule(rule, nghRule));
  };

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    console.log(params);
    if (params.rule) {
      const newRule = parseInt(params.rule as string);
      if (!isNaN(newRule)) {
        setRule(newRule);
      }
    }
    if (params.neighbors) {
      const newNeighbors = parseInt(params.neighbors as string);
      if (!isNaN(newNeighbors)) {
        setNghGrid(ruleToGrid(newNeighbors));
      }
    }
  }, []);

  const generateAppParams = () => {
    const params = queryString.stringify({rule, neighbors: nghRule});
    return `${window.location.origin}/?${params}`;
  };

  const clipboardAppParams = async () => {
    return navigator.clipboard.writeText(generateAppParams());
  };

  /* Animation */
  const [running, setRunning] = useState(false);
  const [frameRate, setFrameRate] = useState(FRAME_RATE);
  useInterval(
    () => {
      applyRuleGrid();
    },
    running ? Math.floor(1000 / frameRate) : null,
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
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            backgroundColor: '#A3C7D6',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            type="text"
            value={rule}
            onChange={handleRuleInputChange}
            disabled={running}
            label="Rule"
            sx={{
              marginBottom: 5,
              marginRight: 5,
            }}
          />

          <Button
            onClick={generateNewRule}
            disabled={running}
            variant="outlined"
          >
            Generate new Rule
          </Button>
          <TextField
            type="number"
            value={frameRate}
            onChange={handleFrameRateChange}
            label="Frame Rate"
          />
          <Typography>Fill percentage of the grid</Typography>
          <Slider
            defaultValue={0.00000005}
            getAriaValueText={(v) => `${100 * v}%`}
            step={0.01}
            marks
            min={0}
            max={1}
            value={fillPercent}
            onChange={(_, value) => {
              if (typeof value === 'number') setFillPercent(value);
              console.log(value);
            }}
            valueLabelDisplay="auto"
          />
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h3">Neighbors:{'\n '}</Typography>
            <Button onClick={() => setNghGrid(generateGrid(0.5, 3, 3)())}>
              Random Neighbor rule
            </Button>
            <Grid
              grid={nghGrid}
              toggle={toggleCell(nghGrid, running, setNghGrid)}
              layout={NGH_LAYOUT}
            />
            <Button
              onClick={() => setIsModalOpen(false)}
              color="error"
              variant="contained"
            >
              Close
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Typography color="info">
              {generateAppParams()}
              {'   '}
            </Typography>
            <Button
              onClick={clipboardAppParams}
              color="info"
              variant="contained"
            >
              Copy
            </Button>
          </Box>
        </Box>
      </Modal>
      <Grid
        grid={grid}
        toggle={toggleCell(grid, running, setGrid)}
        layout={CANVAS_LAYOUT}
      />

      <Tooltip title="Open settings" placement="left">
        <Fab
          color="secondary"
          disabled={running}
          onClick={() => setIsModalOpen(true)}
          aria-label="opensettings"
          sx={{
            position: 'fixed',
            bottom: (theme) => theme.spacing(26),
            right: (theme) => theme.spacing(4),
          }}
        >
          <BuildIcon fontSize="large" />
        </Fab>
      </Tooltip>
      <Tooltip title="Generate Grid" placement="left">
        <Fab
          color="warning"
          onClick={() => setGrid(generateGrid(fillPercent)())}
          disabled={running}
          aria-label="randomGrid"
          sx={{
            position: 'fixed',
            bottom: (theme) => theme.spacing(18),
            right: (theme) => theme.spacing(4),
          }}
        >
          <ShuffleIcon fontSize="large" />
        </Fab>
      </Tooltip>
      <Tooltip title="Clear Grid" placement="left">
        <Fab
          color="info"
          onClick={() => setGrid(generateGrid(0)())}
          disabled={running}
          aria-label="clear"
          sx={{
            position: 'fixed',
            bottom: (theme) => theme.spacing(10),
            right: (theme) => theme.spacing(4),
          }}
        >
          <BorderClearIcon fontSize="large" />
        </Fab>
      </Tooltip>
      <Tooltip title={running ? 'Pause' : 'Play'} placement="left">
        <Fab
          color={running ? 'error' : 'success'}
          onClick={() => setRunning(!running)}
          aria-label="play"
          sx={{
            position: 'fixed',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(4),
          }}
        >
          {running ? (
            <PauseIcon fontSize="large" />
          ) : (
            <PlayCircleIcon fontSize="large" />
          )}
        </Fab>
      </Tooltip>
    </div>
  );
};
