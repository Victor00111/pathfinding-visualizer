import './App.css';
import React, { useState, useEffect } from 'react';
import Grid from './visual-components/Grid';
import AlgorithmDropdown from './visual-components/AlgorithmDropdown';
import dijkstra from './algorithms/Dijkstra';
import bfs from './algorithms/BFS';

function App() {
  const algorithms = ['BFS', 'Dijkstra'];
  const [grid, setGrid] = useState(Array(19).fill().map(_ => Array(41).fill('empty')));
  const [algoType, setAlgoType] = useState('Unweighted');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);
  const [startPosition, setStartPosition] = useState([0, 0]);
  const [targetPosition, setTargetPosition] = useState([0, 2]);
  const [shortestPath, setShortestPath] = useState([]);
  const [dragging, setDragging] = useState(null);
  

  const setWeightedGrid = (row, col) => {
    const emptyGrid = Array(row).fill().map(_ => Array(col).fill('empty'));
    const weightedGrid = emptyGrid.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex % 2 === 0) {
          if (colIndex % 2 === 1) {
            return (Math.floor(Math.random()*9) + 1);
          }
          else {
            return 'empty';
          }
        }
        else {
          if (colIndex % 2 === 0) {
            return (Math.floor(Math.random()*9) + 1);
          } 
          else {
            return 'wall';
          }
        }
      });
    });
    setGrid(weightedGrid)
  }

  const setGridSmall = () => {
    reset();
    if (algoType === 'Unweighted') {
      setGrid(Array(7).fill(Array(15).fill('empty')));
    } else {
      setWeightedGrid(7, 15);
    }
  }

  const setGridMedium = () => {
    reset();
    if (algoType === 'Unweighted') {
      setGrid(Array(13).fill(Array(29).fill('empty')));
    } else {
      setWeightedGrid(13, 29);
    }
  }

  const setGridLarge = () => {
    reset();
    if (algoType === 'Unweighted') {
      setGrid(Array(19).fill(Array(41).fill('empty')));
    } else {
      setWeightedGrid(19, 41);
    }
  }

  const runDijkstra = () => {
    const path = dijkstra(grid, startPosition, targetPosition);
    setShortestPath(path);
    console.log(grid);
  }

  const runBFS = () => {
    const path = bfs(grid, startPosition, targetPosition);
    setShortestPath(path);
    console.log(grid);
  }

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    if (algorithm === 'BFS') {
      setAlgoType('Unweighted');
    } else {
      setAlgoType('Weighted');
    }
    setGridMedium();
  };

  useEffect(() => {
    setGridMedium();
  }, [algoType]);

  const resetPath = () => {
    setShortestPath([]);
  }

  const reset = () => {
    setShortestPath([]);
    setStartPosition([0, 0]);
    setTargetPosition([0, 2]);
  }

  const handleDragStart = (position) => {
    if (position[0] === startPosition[0] && position[1] === startPosition[1]) {
      setDragging('start');
    } else if (position[0] === targetPosition[0] && position[1] === targetPosition[1]) {
      setDragging('target');
    }
  };

  const handleDragEnter = (position) => {
    if (dragging === 'start' && grid[position[0]][position[1]] === 'empty') {
      resetPath();
      setStartPosition(position);
    } else if (dragging === 'target' && grid[position[0]][position[1]] === 'empty') {
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
      <AlgorithmDropdown
        algorithms={algorithms}
        selectedAlgorithm={selectedAlgorithm}
        onChange={handleAlgorithmChange}
      />
      <button onClick={runDijkstra}>Run Dijkstra's Algorithm</button>
      <button onClick={runBFS}>Run Breadth First Search</button>
      <button onClick={resetPath}>Reset Path</button>
      <Grid 
        grid={grid} shortestPath={shortestPath} startPosition={startPosition} targetPosition={targetPosition}
        onDragStart={handleDragStart} onDragEnter={handleDragEnter} onDragEnd={handleDragEnd} algoType={algoType}
      />
    </div>
  );
}

export default App;
