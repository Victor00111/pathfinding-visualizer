import React from 'react';

const AlgorithmDropdown = ({ algorithms, selectedAlgorithm, onChange }) => {
  return (
    <select value={selectedAlgorithm} onChange={(e) => onChange(e.target.value)}>
      {algorithms.map((algorithm) => (
        <option key={algorithm} value={algorithm}>
          {algorithm}
        </option>
      ))}
    </select>
  );
};

export default AlgorithmDropdown;