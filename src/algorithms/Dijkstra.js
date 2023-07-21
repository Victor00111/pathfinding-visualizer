function dijkstra(grid, start, target) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const distances = Array(numRows).fill().map(() => Array(numCols).fill(Infinity));
    const previous = Array(numRows).fill().map(() => Array(numCols).fill(null));
    const unvisited = new Set();
  
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
      if (current === target) {
        break;
      }
  
      unvisited.delete(current);
  
      const [currentRow, currentCol] = current;
      // Update distances and previous positions for neighbors of the current position
      const neighbors = [
        [currentRow - 2, currentCol, currentRow - 1],
        [currentRow + 2, currentCol, currentRow + 1],
        [currentRow, currentCol - 2, currentCol - 1],
        [currentRow, currentCol + 2, currentCol + 1],
    ];

    for (const neighbor of neighbors) {
      const [neighborRow, neighborCol, neighborWeight] = neighbor;

      // Check if the neighbor position is within the grid boundaries
      if (neighborRow >= 0 && neighborRow < numRows && neighborCol >= 0 && neighborCol < numCols) {
        let distance = 0
        if (neighborRow === currentRow - 2 || neighborRow === currentRow + 2) {
          distance = distances[currentRow][currentCol] + grid[neighborWeight][currentCol];
        } else {
          distance = distances[currentRow][currentCol] + grid[currentRow][neighborWeight];
        }

        // Update distances and previous positions if the tentative distance is smaller
        if (distance < distances[neighborRow][neighborCol]) {
          distances[neighborRow][neighborCol] = distance;
          previous[neighborRow][neighborCol] = current;
          /*
          if (neighborRow === currentRow - 2 || neighborRow === currentRow + 2) {
            previous[neighborRow][neighborCol] = previous[neighborWeight][neighborCol];
            previous[neighborWeight][neighborCol] = current;
          } else {
            previous[neighborRow][neighborCol] = previous[neighborRow][neighborWeight];
            previous[neighborRow][neighborWeight] = current;
          }
          */
        }
        // Return the shortest path if we've reached the target
        if (current[0] === target[0] && current[1] === target[1]) {
          return findShortestPath(previous, target);
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