import React from 'react';
import Cell from './Cell';

const Grid = ({grid, shortestPath, startPosition, targetPosition, onDragStart, onDragEnter, onDragEnd}) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="row">
          {row.map((cellState, columnIndex) => {
            const currentPosition = [rowIndex, columnIndex];
            const isPath = shortestPath.some(
              (position) => position[0] === currentPosition[0] && position[1] === currentPosition[1]
            );
            if (rowIndex === startPosition[0] && columnIndex === startPosition[1]) {
              cellState = "start";
            } else if (rowIndex === targetPosition[0] && columnIndex === targetPosition[1]) {
              cellState = "target";
            } else if (isPath) {
              cellState = "path";
            }
            return (
              <Cell
                key={columnIndex}
                state={cellState}
                onMouseDown={() => onDragStart(currentPosition)}
                onMouseEnter={() => onDragEnter(currentPosition)}
                onMouseUp={onDragEnd}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
