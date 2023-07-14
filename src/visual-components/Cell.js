import React from 'react';

const Cell = ({ state, onMouseDown, onMouseEnter, onMouseUp}) => {
  return <div 
  className={`cell ${state}`}
  onMouseDown={onMouseDown}
  onMouseEnter={onMouseEnter}
  onMouseUp={onMouseUp}
  ></div>;
};

export default Cell;
