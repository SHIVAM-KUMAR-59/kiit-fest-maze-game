import type { MazeCell, MazeGrid, WallKey } from "@/types/maze";

interface MazeDirection {
  dr: number;
  dc: number;
  wall: WallKey;
  opp: WallKey;
}

const DIRECTIONS: MazeDirection[] = [
  { dr: -1, dc: 0, wall: "top", opp: "bottom" },
  { dr: 1, dc: 0, wall: "bottom", opp: "top" },
  { dr: 0, dc: -1, wall: "left", opp: "right" },
  { dr: 0, dc: 1, wall: "right", opp: "left" },
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate a maze using the Recursive Backtracker (DFS) algorithm.
 * Each cell tracks which walls are still present (true = wall exists).
 */
export function generateMaze(rows: number, cols: number): MazeGrid {
  const grid: MazeGrid = Array.from({ length: rows }, () =>
    Array.from<unknown, MazeCell>({ length: cols }, () => ({
      top: true,
      right: true,
      bottom: true,
      left: true,
      visited: false,
    })),
  );

  function carve(r: number, c: number): void {
    grid[r][c].visited = true;
    shuffle(DIRECTIONS).forEach(({ dr, dc, wall, opp }) => {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !grid[nr][nc].visited
      ) {
        grid[r][c][wall] = false;
        grid[nr][nc][opp] = false;
        carve(nr, nc);
      }
    });
  }

  carve(0, 0);
  return grid;
}
