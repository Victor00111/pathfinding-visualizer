import './App.css';
import React from 'react';
import Grid from './visual-components/Grid';

function App() {
  const rowSize = 40;
  const colSize = 18;
  return (
    <div className="app">
      <h1>Robot Navigation Simulator</h1>
      <Grid rowSize={rowSize} colSize={colSize} />
    </div>
  );
}

export default App;
