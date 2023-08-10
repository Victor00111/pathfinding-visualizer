import React from 'react';

const Weight = ({ state, weight, onMouseDown, onMouseEnter, onMouseUp}) => {
  
  return <div 
    className={state}
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
    onMouseUp={onMouseUp}
  >{weight}</div>;
};

export default Weight;
