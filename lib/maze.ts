import type { MazeCell, MazeGrid } from "@/types/maze";

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Block-grid maze generator.
 *
 * The grid is (2×rows+1) × (2×cols+1) so every logical cell sits at an odd
 * (r, c) index and every connector / border block sits at an even index.
 *
 * 1. All cells start as walls.
 * 2. Logical cells are opened.
 * 3. DFS spanning-tree carves passages (guaranteed connectivity).
 * 4. Extra connector cells are randomly opened to create loop paths.
 * 5. Bombs are placed on random logical cells (not start/end).
 */
export function generateMaze(
  rows: number,
  cols: number,
  bombCount: number = 0,
): MazeGrid {
  const blockRows = 2 * rows + 1;
  const blockCols = 2 * cols + 1;

  // All cells start as solid walls
  const grid: MazeGrid = Array.from({ length: blockRows }, () =>
    Array.from<unknown, MazeCell>({ length: blockCols }, () => ({
      isWall: true,
      hasBomb: false,
    })),
  );

  // Open every logical cell (odd row AND odd col)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid[2 * r + 1][2 * c + 1].isWall = false;
    }
  }

  // DFS spanning tree — guarantees every cell is reachable (perfect maze base)
  const visited = Array.from({ length: rows }, () =>
    new Array<boolean>(cols).fill(false),
  );
  const DIRS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function carve(r: number, c: number): void {
    visited[r][c] = true;
    for (const [dr, dc] of shuffle(DIRS)) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        // Open the connector block between (r,c) and (nr,nc)
        grid[2 * r + 1 + dr][2 * c + 1 + dc].isWall = false;
        carve(nr, nc);
      }
    }
  }

  carve(0, 0);

  // Add extra connections to create loops / multiple paths (~25% of cells)
  const extraPasses = Math.floor(rows * cols * 0.25);
  for (let i = 0; i < extraPasses; i++) {
    // Random horizontal connector  (between logical (r, c) and (r, c+1))
    const hr = Math.floor(Math.random() * rows);
    const hc = Math.floor(Math.random() * (cols - 1));
    grid[2 * hr + 1][2 * hc + 2].isWall = false;

    // Random vertical connector  (between logical (r, c) and (r+1, c))
    const vr = Math.floor(Math.random() * (rows - 1));
    const vc = Math.floor(Math.random() * cols);
    grid[2 * vr + 2][2 * vc + 1].isWall = false;
  }

  // ── Find a solution path (BFS) ──────────────────────────────────────────
  const path = new Set<string>();
  const queue: [number, number][] = [[0, 0]];
  const parents = new Map<string, string>();
  const pathVisited = new Set<string>(["0,0"]);

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    if (r === rows - 1 && c === cols - 1) {
      let curr: string | undefined = `${r},${c}`;
      while (curr) {
        path.add(curr);
        curr = parents.get(curr);
      }
      break;
    }

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        // block connector check
        if (!grid[2 * r + 1 + dr][2 * c + 1 + dc].isWall) {
          const key = `${nr},${nc}`;
          if (!pathVisited.has(key)) {
            pathVisited.add(key);
            parents.set(key, `${r},${c}`);
            queue.push([nr, nc]);
          }
        }
      }
    }
  }

  // Place bombs on random LOGICAL cells (not start, end, or on the main path)
  if (bombCount > 0) {
    const candidates: [number, number][] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r === 0 && c === 0) continue;
        if (r === rows - 1 && c === cols - 1) continue;
        if (path.has(`${r},${c}`)) continue; // Keep solution path clear
        candidates.push([r, c]);
      }
    }
    const shuffled = shuffle(candidates);
    for (let i = 0; i < Math.min(bombCount, shuffled.length); i++) {
      const [r, c] = shuffled[i];
      grid[2 * r + 1][2 * c + 1].hasBomb = true;
    }
  }

  return grid;
}
