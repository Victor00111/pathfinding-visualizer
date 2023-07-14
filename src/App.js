import './App.css';
import React, { useState } from 'react';
import Grid from './visual-components/Grid';
import dijkstra from './algorithms/Dijkstra';

function App() {
  const rowSize = 40;
  const colSize = 18;
  const grid = Array(colSize).fill(Array(rowSize).fill('empty'));
  const [startPosition, setStartPosition] = useState([8, 10]);
  const [targetPosition, setTargetPosition] = useState([8, 30]);
  const [shortestPath, setShortestPath] = useState([]);
  const [dragging, setDragging] = useState(null);

  const runDijkstra = () => {
    const path = dijkstra(grid, startPosition, targetPosition);
    setShortestPath(path);
    console.log(shortestPath);
  };
  
  const reset = () => {
    setShortestPath([]);
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
      setStartPosition(position);
    } else if (dragging === 'target') {
      setTargetPosition(position);
    }
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  return (
    <div className="app">
      <h1>Robot Navigation Simulator</h1>
      <button onClick={runDijkstra}>Run Dijkstra's Algorithm</button>
      <button onClick={reset}>Reset</button>
      <Grid grid={grid} rowSize={rowSize} colSize={colSize} shortestPath={shortestPath}
            startPosition={startPosition} targetPosition={targetPosition} onDragStart={handleDragStart} 
            onDragEnter={handleDragEnter} onDragEnd={handleDragEnd}
            />
    </div>
  );
}

export default App;
