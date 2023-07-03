import React from 'react';
import Cell from './Cell';

const Grid = ({ rowSize, colSize }) => {
  const grid = Array(colSize).fill(Array(rowSize).fill('empty'));
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cellState, columnIndex) => (
            <Cell key={columnIndex} state={cellState} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
