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
import { calcStars } from "@/lib/constants";

export interface UseMazeGameReturn {
  screen: ScreenState;
  levelCfg: LevelConfig | null;
  maze: MazeGrid | null;
  player: Position;
  moves: number;
  time: number;
  stars: Star[];
  startLevel: (cfg: LevelConfig) => void;
  move: (dir: Direction) => void;
  goHome: () => void;
}

export function useMazeGame(): UseMazeGameReturn {
  const [screen, setScreen] = useState<ScreenState>("home");
  const [levelCfg, setLevelCfg] = useState<LevelConfig | null>(null);
  const [maze, setMaze] = useState<MazeGrid | null>(null);
  const [player, setPlayer] = useState<Position>({ r: 0, c: 0 });
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen === "game") {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen]);

  // ── Start level ────────────────────────────────────────────────────────────
  const startLevel = useCallback((cfg: LevelConfig) => {
    setLevelCfg(cfg);
    setMaze(generateMaze(cfg.rows, cfg.cols));
    setPlayer({ r: 0, c: 0 });
    setMoves(0);
    setTime(0);
    setScreen("game");
  }, []);

  // ── Move player ────────────────────────────────────────────────────────────
  const move = useCallback(
    (dir: Direction) => {
      if (!maze || !levelCfg || screen !== "game") return;

      setPlayer((prev) => {
        const { r, c } = prev;
        const cell = maze[r][c];
        let nr = r;
        let nc = c;

        if (dir === "up" && !cell.top) nr--;
        if (dir === "down" && !cell.bottom) nr++;
        if (dir === "left" && !cell.left) nc--;
        if (dir === "right" && !cell.right) nc++;

        if (nr === r && nc === c) return prev;

        setMoves((m) => m + 1);

        // Check win condition
        if (nr === levelCfg.rows - 1 && nc === levelCfg.cols - 1) {
          setTimeout(() => {
            const s = calcStars(moves + 1, time + 1, levelCfg.level);
            setStars(s);
            setScreen("win");
          }, 100);
        }

        return { r: nr, c: nc };
      });
    },
    [maze, screen, levelCfg, moves, time],
  );

  // ── Go home ────────────────────────────────────────────────────────────────
  const goHome = useCallback(() => setScreen("home"), []);

  return {
    screen,
    levelCfg,
    maze,
    player,
    moves,
    time,
    stars,
    startLevel,
    move,
    goHome,
  };
}
