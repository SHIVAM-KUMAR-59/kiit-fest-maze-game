/**
 * Block-grid model.
 * The actual grid is (2×rows+1) × (2×cols+1).
 * Logical player cells sit at odd indices; wall/connector cells at even indices.
 */
export interface MazeCell {
  isWall: boolean;
  hasBomb: boolean;
}

export type MazeGrid = MazeCell[][];

export type Direction = "up" | "down" | "left" | "right";

export interface Position {
  r: number;
  c: number;
}

export interface LevelConfig {
  level: number;
  rows: number;
  cols: number;
  label: string;
  sub: string;
  bombs: number;
  /** Time limit in seconds. Player is eliminated when elapsed time reaches this. */
  timeLimit: number;
}

export type ScreenState = "game" | "win" | "dead";

export type Star = "★" | "☆";
