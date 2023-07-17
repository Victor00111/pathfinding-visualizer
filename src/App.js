import './App.css';
import React, { useState } from 'react';
import Grid from './visual-components/Grid';
import dijkstra from './algorithms/Dijkstra';

function App() {
  const [grid, setGrid] = useState(Array(18).fill().map(_ => Array(40).fill('empty')));
  const [algoType, setAlgoType] = useState('unweighted');
  const [startPosition, setStartPosition] = useState([0, 0]);
  const [targetPosition, setTargetPosition] = useState([0, 1]);
  const [shortestPath, setShortestPath] = useState([]);
  const [dragging, setDragging] = useState(null);

  const setWeightedGrid = (row, col) => {
    const emptyGrid = Array(row).fill().map(_ => Array(col).fill('empty'));
    const weightedGrid = emptyGrid.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex % 2 === 0) {
          if (colIndex % 2 === 1) {
            return (Math.floor(Math.random()*10) + 1)
          }
          else {
            return 'empty'
          }
        }
        else {
          if (colIndex % 2 === 0) {
            return (Math.floor(Math.random()*10) + 1)
          } 
          else {
            return null
          }
        }
      });
    });
    console.log(weightedGrid)
    setGrid(weightedGrid)
  }

  const setGridSmall = () => {
    reset()
    if (algoType === 'unweighted') {
      setGrid(Array(6).fill(Array(15).fill('empty')))
    } else {
      setWeightedGrid(7, 15)
    }
  }

  const setGridMedium = () => {
    reset()
    if (algoType === 'unweighted') {
      setGrid(Array(12).fill(Array(30).fill('empty')))
    } else {
      setWeightedGrid(13, 27)
    }
  }

  const setGridLarge = () => {
    reset()
    if (algoType === 'unweighted') {
      setGrid(Array(18).fill(Array(40).fill('empty')))
    } else {
      setWeightedGrid(19, 41)
    }
  }

  const runDijkstra = () => {
    const path = dijkstra(grid, startPosition, targetPosition);
    setShortestPath(path);
    console.log(grid)
  };

  const handleDijkstra = () => {
    setWeightedGrid(19, 41);
    // setAlgoType('weighted');
    // runDijkstra();
  }

  const resetPath = () => {
    setShortestPath([]);
  }

  const reset = () => {
    setShortestPath([]);
    setStartPosition([0, 0]);
    setTargetPosition([0, 1]);
  }

  const handleDragStart = (position) => {
    if (position[0] === startPosition[0] && position[1] === startPosition[1]) {
      setDragging('start');
    } else if (position[0] === targetPosition[0] && position[1] === targetPosition[1]) {
      setDragging('target');
    }
  };

  const handleDragEnter = (position) => {
    if (dragging === 'start') {
      resetPath();
      setStartPosition(position);
    } else if (dragging === 'target') {
      resetPath();
      setTargetPosition(position);
    }
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  return (
    <div className="app">
      <h1>Robot Navigation Simulator</h1>
      <button onClick={setGridSmall}>Small Graph</button>
      <button onClick={setGridMedium}>Medium Graph</button>
      <button onClick={setGridLarge}>Large Graph</button>
      <button onClick={runDijkstra}>Run Dijkstra's Algorithm</button>
      <button onClick={resetPath}>Reset</button>
      <button onClick={handleDijkstra}>Test Weighted Grid</button>
      <Grid 
        grid={grid} shortestPath={shortestPath} startPosition={startPosition} targetPosition={targetPosition}
        onDragStart={handleDragStart} onDragEnter={handleDragEnter} onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default App;
