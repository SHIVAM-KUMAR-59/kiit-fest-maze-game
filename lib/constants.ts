import type { LevelConfig, Star } from "@/types/maze";

export const LEVELS: LevelConfig[] = [
  { level: 1, rows: 6, cols: 6, label: "Level 1", sub: "6 × 6  ·  Easy" },
  { level: 2, rows: 8, cols: 8, label: "Level 2", sub: "8 × 8  ·  Medium" },
  {
    level: 3,
    rows: 10,
    cols: 10,
    label: "Level 3",
    sub: "10 × 10  ·  Hard",
  },
];

/** Cell size in pixels per level */
export const CELL_SIZE: Record<number, number> = { 1: 64, 2: 52, 3: 44 };

/** Wall thickness in pixels */
export const WALL_WIDTH = 3;

const MAX_MOVES: Record<number, number> = { 1: 30, 2: 55, 3: 90 };
const MAX_TIME: Record<number, number> = { 1: 60, 2: 120, 3: 200 };

/** Calculate 1–3 star rating based on moves and time */
export function calcStars(moves: number, time: number, level: number): Star[] {
  const stars: Star[] = ["★"]; // always at least 1 star
  if (moves <= (MAX_MOVES[level] ?? Infinity)) stars.push("★");
  if (time <= (MAX_TIME[level] ?? Infinity)) stars.push("★");
  while (stars.length < 3) stars.push("☆");
  return stars;
}

/** Format seconds as MM:SS */
export function formatTime(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}
