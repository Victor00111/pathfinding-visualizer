function bfs(grid, start, target, delay) {
  const queue = [start];
  const visited = new Set();
  const previous = new Map();
  let visitedCells = [];

  while (queue.length > 0) {
    const current = queue.shift();

    // Check if the target is found
    if (current[0] === target[0] && current[1] === target[1]) {
      return {path: getPath(previous, start, target), visited: visitedCells};
    }

    // Explore neighbors
    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      const neighborString = neighbor.join(',');
      if (!visited.has(neighborString)) {
        visited.add(neighborString);
        queue.push(neighbor);
        previous.set(neighborString, current);
        visitedCells = [...visitedCells, neighbor];
      }
    }
  }

  // If no path is found
  return {path: [], visitedCells: visitedCells};
}

function getNeighbors(grid, [row, col]) {
  const neighbors = [];
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Possible movements: up, down, left, right
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols && grid[newRow][newCol] !== 'wall') {
      neighbors.push([newRow, newCol]);
    }
  }

  return neighbors;
}

function getPath(previous, start, target) {
  const path = [];
  let current = target;

  while (current[0] !== start[0] || current[1] !== start[1]) {
    path.unshift(current);
    current = previous.get(current.join(','));
  }

  path.unshift(start);
  return path;
}

export default bfs;