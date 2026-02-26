import type { LevelConfig, Star } from "@/types/maze";

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    rows: 6,
    cols: 6,
    label: "Level 1",
    sub: "6 × 6  ·  Easy",
    bombs: 0,
    timeLimit: 60, // 1 minute
  },
  {
    level: 2,
    rows: 8,
    cols: 8,
    label: "Level 2",
    sub: "8 × 8  ·  Medium",
    bombs: 1,
    timeLimit: 90, // 1 minute 30 seconds
  },
  {
    level: 3,
    rows: 10,
    cols: 10,
    label: "Level 3",
    sub: "10 × 10  ·  Hard",
    bombs: 2,
    timeLimit: 105, // 1 minute 45 seconds
  },
];

/** Pixel size of each block cell in the rendered block grid */
export const BLOCK_CELL_SIZE: Record<number, number> = { 1: 28, 2: 22, 3: 18 };

/** How many cells around the player are visible (fog radius) */
export const FOG_RADIUS = 1;

/** Points awarded per level completion */
export const LEVEL_POINTS: Record<number, number> = { 1: 100, 2: 250, 3: 500 };

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

/** Calculate score: base points + time bonus − move penalty */
export function calcScore(level: number, time: number, moves: number): number {
  const base = LEVEL_POINTS[level] ?? 100;
  const timeBonus = Math.max(0, (MAX_TIME[level] ?? 120) - time) * 2;
  const movePenalty = Math.max(0, moves - (MAX_MOVES[level] ?? 30)) * 3;
  return Math.max(0, base + timeBonus - movePenalty);
}

/** Format seconds as MM:SS */
export function formatTime(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}
