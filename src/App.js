import './App.css';
import React, { useState } from 'react';
import Grid from './visual-components/Grid';
import dijkstra from './algorithms/Dijkstra';

function App() {
  const rowSize = 40;
  const colSize = 18;
  const grid = Array(colSize).fill(Array(rowSize).fill('empty'));
  const [start, setStart] = useState([8, 10]);
  const [target, setTarget] = useState([8, 30]);
  const [shortestPath, setShortestPath] = useState([]);

  const runDijkstra = () => {
    const path = dijkstra(grid, start, target);
    setShortestPath(path);
    console.log(shortestPath);
  };
  
  const handleDragStart = (position) => {
    // Set the start position when dragging the start cell
    if (position[0] === start[0] && position[1] === start[1]) {
      setStart(position);
    } else if (position[0] === target[0] && position[1] === target[1]) {
      setTarget(position);
    }
  };

  const handleDragEnter = (position) => {
    // Update the start position while dragging
    if (position[0] !== start[0] || position[1] !== start[1]) {
      setStart(position);
    } else if (position[0] !== target[0] || position[1] !== target[1]) {
      setTarget(position);
    }
  };

  return (
    <div className="app">
      <h1>Robot Navigation Simulator</h1>
      <button onClick={runDijkstra}>Run Dijkstra's Algorithm</button>
      {/*<button onClick={setShortestPath([])}>Reset</button>*/}
      <Grid grid={grid} rowSize={rowSize} colSize={colSize} shortestPath={shortestPath}
            start={start} target={target} onDragStart={handleDragStart} onDragEnter={handleDragEnter} 
            />
    </div>
  );
}

export default App;
