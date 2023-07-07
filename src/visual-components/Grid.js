import React from 'react';
import Cell from './Cell';

const Grid = ({ grid, shortestPath, start, target, onDragStart, onDragEnter}) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="row">
          {row.map((cellState, columnIndex) => {
            const currentPosition = [rowIndex, columnIndex];
            const isPath = shortestPath.some(
              (position) => position[0] === currentPosition[0] && position[1] === currentPosition[1]
            );
            if (rowIndex === start[0] && columnIndex === start[1]) {
              cellState = "start";
            } else if (rowIndex === target[0] && columnIndex === target[1]) {
              cellState = "target"
            } else if (isPath) {
              cellState = "path";
            }

            return (
              <Cell
                key={columnIndex}
                state={cellState}
                onDragStart={() => onDragStart(currentPosition)}
                onDragEnter={() => onDragEnter(currentPosition)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
