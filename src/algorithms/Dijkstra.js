function dijkstra(grid, start, target) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const distances = Array(numRows).fill().map(() => Array(numCols).fill(Infinity));
  const previous = Array(numRows).fill().map(() => Array(numCols).fill(null));
  const unvisited = new Set();
  let visitedCells = [];

  // Set start position to 0
  distances[start[0]][start[1]] = 0;

  // Initialize unvisited set with all positions
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      unvisited.add([row, col]);
    }
  }
  
  while (unvisited.size > 0) {
    let current = null;
    let minDistance = Infinity;

    // Find the unvisited position with the smallest distance
    for (const position of unvisited) {
      const [row, col] = position;
      if (distances[row][col] < minDistance) {
        minDistance = distances[row][col];
        current = position;
      }
    }

    // Add current and its respective weight to visited
    if (previous[current[0]][current[1]] !== null) {
      visitedCells = [...visitedCells, previous[current[0]][current[1]]];
    } 
    visitedCells = [...visitedCells, current];

    // Return the shortest path if we've reached the target
    if (current[0] === target[0] && current[1] === target[1]) {
      return {path: findShortestPath(previous, target), visited: visitedCells};
    }

    unvisited.delete(current);
    const [currentRow, currentCol] = current;
    // Update distances and previous positions for neighbors of the current position
    const neighbors = [
      [currentRow - 2, currentCol, currentRow - 1, true],
      [currentRow + 2, currentCol, currentRow + 1, true],
      [currentRow, currentCol - 2, currentCol - 1, false],
      [currentRow, currentCol + 2, currentCol + 1, false],
    ];

    for (const neighbor of neighbors) {
      const [neighborRow, neighborCol, neighborWeight] = neighbor;

      // Check if the neighbor position is within the grid boundaries
      if (neighborRow >= 0 && neighborRow < numRows && neighborCol >= 0 && neighborCol < numCols) {
        let distance = 0;
        if (neighborRow === currentRow - 2 || neighborRow === currentRow + 2) {
          distance = distances[currentRow][currentCol] + grid[neighborWeight][currentCol];
        } else {
          distance = distances[currentRow][currentCol] + grid[currentRow][neighborWeight];
        }

        // Update distances and previous positions if the tentative distance is smaller
        if (distance < distances[neighborRow][neighborCol]) {
          distances[neighborRow][neighborCol] = distance;
          if (neighborRow === currentRow - 2 || neighborRow === currentRow + 2) {
            previous[neighborWeight][neighborCol] = current;
            previous[neighborRow][neighborCol] = [neighborWeight, neighborCol];
          } else {
            previous[neighborRow][neighborWeight] = current;
            previous[neighborRow][neighborCol] = [neighborRow, neighborWeight];
          }
        }
        
      }
    }
    
  }
  // If a path does not exist
  return null
}

function findShortestPath(previous, target) {
  // Construct the shortest path
  const shortestPath = [];
  let currentPosition = target;
  while (currentPosition) {
    shortestPath.unshift(currentPosition);
    const [row, col] = currentPosition;
    currentPosition = previous[row][col];
  }
  return shortestPath;
}

export default dijkstra