export interface MazeCell {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  visited: boolean;
}

export type MazeGrid = MazeCell[][];

export type Direction = "up" | "down" | "left" | "right";

export type WallKey = "top" | "right" | "bottom" | "left";

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
}

export type ScreenState = "home" | "game" | "win";

export type Star = "★" | "☆";
