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
import { HomeScreen } from "@/components/maze/home-screen";
import { GameScreen } from "@/components/maze/game-screen";
import { WinScreen } from "@/components/maze/win-screen";
import { loadPlayer } from "@/lib/player-store";
import { LEVELS } from "@/lib/constants";
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
  const [player, setPlayer] = useState<{ name: string; email: string } | null>(
    null,
  );

  // ── Guard: require registration ────────────────────────────────────────────
  useEffect(() => {
    const info = loadPlayer();
    if (!info) {
      router.replace("/");
      return;
    }
    startTransition(() => {
      setPlayer(info);
    });
  }, [router]);

  const ready = player !== null;

  const {
    screen,
    levelCfg,
    maze,
    player: pos,
    moves,
    time,
    stars,
    startLevel,
    move,
    goHome,
  } = useMazeGame();

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

  if (!ready) return null;

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background p-3 font-sans text-foreground sm:p-4"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait" initial={false}>
        {screen === "home" && (
          <motion.div key="home" {...slide} className="w-full max-w-3xl">
            <HomeScreen onStartLevel={startLevel} />
            {player && (
              <p className="mt-3 text-center text-xs tracking-wide text-muted-foreground">
                Signed in as {player.name} · {player.email}
                {" · "}
                <button
                  className="underline underline-offset-2 hover:text-primary"
                  onClick={() => router.push("/leaderboard")}
                >
                  Leaderboard
                </button>
              </p>
            )}
          </motion.div>
        )}

        {screen === "game" && maze && levelCfg && (
          <motion.div key="game" {...slide} className="w-full">
            <GameScreen
              maze={maze}
              player={pos}
              levelCfg={levelCfg}
              time={time}
              moves={moves}
              onMove={move}
              onHome={goHome}
            />
          </motion.div>
        )}

        {screen === "win" && levelCfg && (
          <motion.div key="win" {...slide} className="w-full max-w-3xl">
            <WinScreen
              levelCfg={levelCfg}
              stars={stars}
              time={time}
              moves={moves}
              onRetry={() => startLevel(levelCfg)}
              onNextLevel={() =>
                levelCfg.level < 3 ?
                  startLevel(LEVELS[levelCfg.level])
                : undefined
              }
              onHome={goHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
