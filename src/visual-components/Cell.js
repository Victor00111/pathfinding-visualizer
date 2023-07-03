import React from 'react';

const Cell = ({ state }) => {
  return <div className={`cell ${state}`}></div>;
};

export default Cell;
