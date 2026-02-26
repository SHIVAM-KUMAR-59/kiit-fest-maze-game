"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  MazeGrid,
  Position,
  Direction,
  ScreenState,
  Star,
  LevelConfig,
} from "@/types/maze";
import { generateMaze } from "@/lib/maze";
import { calcStars, calcScore, LEVELS } from "@/lib/constants";

export interface LevelResult {
  level: number;
  time: number;
  moves: number;
  score: number;
  stars: Star[];
}

export interface UseMazeGameReturn {
  screen: ScreenState;
  levelCfg: LevelConfig;
  maze: MazeGrid | null;
  player: Position;
  moves: number;
  time: number;
  stars: Star[];
  totalScore: number;
  results: LevelResult[];
  currentLevel: number;
  startGame: () => void;
  nextLevel: () => void;
  move: (dir: Direction) => void;
}

export function useMazeGame(): UseMazeGameReturn {
  const [currentLevel, setCurrentLevel] = useState(0); // index into LEVELS
  const [screen, setScreen] = useState<ScreenState>("game");
  const [maze, setMaze] = useState<MazeGrid | null>(null);
  const [player, setPlayer] = useState<Position>({ r: 0, c: 0 });
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [results, setResults] = useState<LevelResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const levelCfg = LEVELS[currentLevel] ?? LEVELS[0];

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen === "game" && maze) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen, maze]);

  // ── Time-limit enforcement ─────────────────────────────────────────────────
  useEffect(() => {
    if (screen === "game" && time >= levelCfg.timeLimit) {
      setScreen("dead");
    }
  }, [time, screen, levelCfg.timeLimit]);

  // ── Start game (level 1) ──────────────────────────────────────────────────
  const startGame = useCallback(() => {
    const cfg = LEVELS[0];
    setCurrentLevel(0);
    setMaze(generateMaze(cfg.rows, cfg.cols, cfg.bombs));
    setPlayer({ r: 0, c: 0 });
    setMoves(0);
    setTime(0);
    setStars([]);
    setTotalScore(0);
    setResults([]);
    setScreen("game");
  }, []);

  // ── Next level ─────────────────────────────────────────────────────────────
  const nextLevel = useCallback(() => {
    const next = currentLevel + 1;
    if (next >= LEVELS.length) return; // shouldn't be called
    const cfg = LEVELS[next];
    setCurrentLevel(next);
    setMaze(generateMaze(cfg.rows, cfg.cols, cfg.bombs));
    setPlayer({ r: 0, c: 0 });
    setMoves(0);
    setTime(0);
    setStars([]);
    setScreen("game");
  }, [currentLevel]);

  // ── Move player ────────────────────────────────────────────────────────────
  const move = useCallback(
    (dir: Direction) => {
      if (!maze || screen !== "game") return;

      setPlayer((prev) => {
        const { r, c } = prev;
        let dr = 0;
        let dc = 0;
        if (dir === "up") dr = -1;
        if (dir === "down") dr = 1;
        if (dir === "left") dc = -1;
        if (dir === "right") dc = 1;

        // In the block grid, the connector cell between logical (r,c) and
        // (r+dr, c+dc) sits at block index (2r+1+dr, 2c+1+dc).
        const connR = 2 * r + 1 + dr;
        const connC = 2 * c + 1 + dc;
        if (maze[connR]?.[connC]?.isWall !== false) return prev; // blocked

        const nr = r + dr;
        const nc = c + dc;

        const newMoves = moves + 1;
        setMoves(newMoves);

        // Check bomb at the logical destination cell
        if (maze[2 * nr + 1][2 * nc + 1].hasBomb) {
          setTimeout(() => {
            setScreen("dead");
          }, 80);
          return { r: nr, c: nc };
        }

        // Check win condition
        if (nr === levelCfg.rows - 1 && nc === levelCfg.cols - 1) {
          setTimeout(() => {
            const s = calcStars(newMoves, time + 1, levelCfg.level);
            const score = calcScore(levelCfg.level, time + 1, newMoves);
            setStars(s);
            setTotalScore((prev) => prev + score);
            setResults((prev) => [
              ...prev,
              {
                level: levelCfg.level,
                time: time + 1,
                moves: newMoves,
                score,
                stars: s,
              },
            ]);
            setScreen("win");
          }, 100);
        }

        return { r: nr, c: nc };
      });
    },
    [maze, screen, levelCfg, moves, time],
  );

  return {
    screen,
    levelCfg,
    maze,
    player,
    moves,
    time,
    stars,
    totalScore,
    results,
    currentLevel,
    startGame,
    nextLevel,
    move,
  };
}
