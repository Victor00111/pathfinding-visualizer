import './App.css';
import React, { useState, useEffect } from 'react';
import Grid from './visual-components/Grid';
import AlgorithmDropdown from './visual-components/AlgorithmDropdown';
import dijkstra from './algorithms/Dijkstra';
import bfs from './algorithms/BFS';

function App() {
  const algorithms = ['BFS', 'Dijkstra'];
  const [grid, setGrid] = useState(Array(19).fill().map(_ => Array(41).fill('empty')));
  const [gridSize, setGridSize] = useState('medium');
  const [algoType, setAlgoType] = useState('Unweighted');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);
  const [startPosition, setStartPosition] = useState([0, 0]);
  const [targetPosition, setTargetPosition] = useState([0, 2]);
  const [shortestPath, setShortestPath] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [visitedCells, setVisitedCells] = useState([]);
  
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

  const handleGridSize = (size) => {
    reset();
    if (algoType === 'Unweighted') {
      if (size === 'small') setGrid(Array(7).fill(Array(15).fill('empty')));
      else if (size === 'medium') setGrid(Array(13).fill(Array(29).fill('empty')));
      else setGrid(Array(19).fill(Array(41).fill('empty')));
    } else {
      if ((size === 'small')) setWeightedGrid(7, 15);
      else if (size === 'medium') setWeightedGrid(13, 29);
      else setWeightedGrid(19, 41);
    }
    setGridSize(size);
  }

  const runAlgorithm = async () => {
    if (selectedAlgorithm === 'BFS') {
      const {path, visited} = bfs(grid, startPosition, targetPosition);
      await animateVisitedCells(visited, 40);
      await animateShortestPath(path, 50);
      //console.log(grid);
    } else if (selectedAlgorithm === 'Dijkstra') {
      const {path, visited} = dijkstra(grid, startPosition, targetPosition);
      await animateVisitedCells(visited, 60);
      await animateShortestPath(path, 50);
      //console.log(grid);
    }
  }

  async function animateVisitedCells(visited, delay) {
    console.log(visited)
    for (const cell of visited) {
      setVisitedCells((prevVisitedCell) => [...prevVisitedCell, cell]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  async function animateShortestPath(path, delay) {
    for (const cell of path) {
      setShortestPath((prevShortestPath) => [...prevShortestPath, cell]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    if (algorithm === 'BFS') {
      setAlgoType('Unweighted');
    } else {
      setAlgoType('Weighted');
    }
  };

  useEffect(() => {
    handleGridSize(gridSize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoType]);

  const resetPath = () => {
    setShortestPath([]);
    setVisitedCells([]);
  }

  const reset = () => {
    setShortestPath([]);
    setVisitedCells([]);
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
      <h1>Pathfinding Visualizer</h1>
      <button onClick={() => handleGridSize('small')}>Small Graph</button>
      <button onClick={() => handleGridSize('medium')}>Medium Graph</button>
      <button onClick={() => handleGridSize('large')}>Large Graph</button>
      <AlgorithmDropdown
        algorithms={algorithms}
        selectedAlgorithm={selectedAlgorithm}
        onChange={handleAlgorithmChange}
      />
      <button onClick={runAlgorithm}>Run Algorithm</button>
      <button onClick={resetPath}>Reset Path</button>
      <Grid
        grid={grid} shortestPath={shortestPath} visitedCells={visitedCells} startPosition={startPosition} targetPosition={targetPosition}
        onDragStart={handleDragStart} onDragEnter={handleDragEnter} onDragEnd={handleDragEnd} algoType={algoType}
      />
    </div>
  );
}

export default App;
