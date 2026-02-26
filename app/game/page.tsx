"use client";

import {
  useEffect,
  useRef,
  useCallback,
  useState,
  startTransition,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMazeGame } from "@/hooks/use-maze-game";
import { GameScreen } from "@/components/maze/game-screen";
import { WinScreen } from "@/components/maze/win-screen";
import { DeathScreen } from "@/components/maze/death-screen";
import { loadPlayer } from "@/lib/player-store";
import { LEVELS, calcScore } from "@/lib/constants";
import type { Direction } from "@/types/maze";

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

const slide = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
  transition: { duration: 0.24, ease: "easeOut" as const },
};

export default function GamePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const {
    screen,
    levelCfg,
    maze,
    player: pos,
    moves,
    time,
    stars,
    totalScore,
    results,
    currentLevel,
    startGame,
    nextLevel,
    move,
  } = useMazeGame();

  // ── Guard: require registration, then auto-start level 1 ──────────────────
  useEffect(() => {
    const info = loadPlayer();
    if (!info) {
      router.replace("/");
      return;
    }
    startTransition(() => {
      setReady(true);
      startGame();
    });
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // ── Keyboard controls ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const dir = KEY_MAP[e.key];
      if (dir) {
        e.preventDefault();
        move(dir);
      }
    };
    globalThis.addEventListener("keydown", handler);
    return () => globalThis.removeEventListener("keydown", handler);
  }, [move]);

  // ── Touch / swipe ──────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      if (Math.abs(dx) > Math.abs(dy)) {
        move(dx > 0 ? "right" : "left");
      } else {
        move(dy > 0 ? "down" : "up");
      }
      touchStart.current = null;
    },
    [move],
  );

  const goToLeaderboard = useCallback(() => {
    router.push(`/leaderboard?score=${totalScore}`);
  }, [router, totalScore]);

  if (!ready) return null;

  // Compute level score for win screen
  const lastResult = results[results.length - 1];

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background p-3 font-sans text-foreground sm:p-4"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait" initial={false}>
        {screen === "game" && maze && (
          <motion.div
            key={`game-${currentLevel}`}
            {...slide}
            className="w-full"
          >
            <GameScreen
              maze={maze}
              player={pos}
              levelCfg={levelCfg}
              time={time}
              moves={moves}
              onMove={move}
            />
          </motion.div>
        )}

        {screen === "win" && (
          <motion.div
            key={`win-${currentLevel}`}
            {...slide}
            className="w-full max-w-3xl"
          >
            <WinScreen
              levelCfg={levelCfg}
              stars={stars}
              time={lastResult?.time ?? time}
              moves={lastResult?.moves ?? moves}
              score={lastResult?.score ?? 0}
              isLastLevel={currentLevel >= LEVELS.length - 1}
              onNextLevel={nextLevel}
              onFinish={goToLeaderboard}
            />
          </motion.div>
        )}

        {screen === "dead" && (
          <motion.div key="dead" {...slide} className="w-full max-w-3xl">
            <DeathScreen
              totalScore={totalScore}
              results={results}
              onFinish={goToLeaderboard}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
