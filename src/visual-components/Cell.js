import React from 'react';

const Cell = ({ state, onDragStart, onDragEnter}) => {
  return <div 
  className={`cell ${state}`}
  onDragStart={onDragStart}
  onDragEnter={onDragEnter}
  ></div>;
};

export default Cell;
