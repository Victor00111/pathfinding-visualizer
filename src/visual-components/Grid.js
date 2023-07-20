import React from 'react';
import Cell from './Cell';
import Weight from './Weight';

const Grid = ({grid, shortestPath, startPosition, targetPosition, onDragStart, onDragEnter, onDragEnd, algoType}) => {
  if (algoType === 'unweighted') {
    return (
      <div className='grid'>
        {grid.map((row, rowIndex) => (
          <div className='row'>
            {row.map((cellState, columnIndex) => {
              const currentPosition = [rowIndex, columnIndex];
              const isPath = shortestPath.some(
                (position) => position[0] === currentPosition[0] && position[1] === currentPosition[1]
              );
              if (rowIndex === startPosition[0] && columnIndex === startPosition[1]) {
                cellState = 'start';
              } else if (rowIndex === targetPosition[0] && columnIndex === targetPosition[1]) {
                cellState = 'target';
              } else if (isPath) {
                cellState = 'path';
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
  }
  // If algoType is weighted
  else {
    return (
      <div className='grid'>
        {grid.map((row, rowIndex) => (
          <div className='row'>
            {row.map((cellState, columnIndex) => {
              const currentPosition = [rowIndex, columnIndex];
              const isPath = shortestPath.some(
                (position) => position[0] === currentPosition[0] && position[1] === currentPosition[1]
              );
              if (!isNaN(grid[rowIndex][columnIndex])) {
                cellState = 'weight';
              } else if (grid[rowIndex][columnIndex] === 'wall') {
                cellState = 'wall';
              } else if (rowIndex === startPosition[0] && columnIndex === startPosition[1]) {
                cellState = 'start';
              } else if (rowIndex === targetPosition[0] && columnIndex === targetPosition[1]) {
                cellState = 'target';
              } else if (isPath) {
                cellState = 'path';
              }
              if (cellState === 'weight') {
                return (
                  <Weight
                    state={cellState}
                    weight={grid[rowIndex][columnIndex]}
                    onMouseDown={() => onDragStart(currentPosition)}
                    onMouseEnter={() => onDragEnter(currentPosition)}
                    onMouseUp={onDragEnd}
                  />
                )
              }
              else {
                return (
                  <Cell
                    state={cellState}
                    onMouseDown={() => onDragStart(currentPosition)}
                    onMouseEnter={() => onDragEnter(currentPosition)}
                    onMouseUp={onDragEnd}
                  />
                );
              }
            })}
          </div>
        ))}
      </div>
    );
  }
};

export default Grid;
