import React from 'react';

const Weight = ({ weight, onMouseDown, onMouseEnter, onMouseUp}) => {
  
  return <div 
    className='weight'
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
    onMouseUp={onMouseUp}
  >{weight}</div>;
};

export default Weight;
