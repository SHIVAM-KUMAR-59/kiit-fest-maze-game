"use client";

import {
  useEffect,
  useRef,
  useCallback,
  useState,
  startTransition,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bomb, Clock } from "lucide-react";
import { useMazeGame } from "@/hooks/use-maze-game";
import { GameScreen } from "@/components/maze/game-screen";
import { WinScreen } from "@/components/maze/win-screen";
import { DeathScreen } from "@/components/maze/death-screen";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
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
  return (
    <Suspense>
      <GameContent />
    </Suspense>
  );
}

function GameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const name = searchParams.get("name") ?? "";
  const email = searchParams.get("email") ?? "";
  const [ready, setReady] = useState(false);
  const [activeDir, setActiveDir] = useState<Direction | null>(null);
  const [deathAlertOpen, setDeathAlertOpen] = useState(false);
  const [showDeathScreen, setShowDeathScreen] = useState(false);
  const prevScreen = useRef<string>("");

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
    deathReason,
    startGame,
    nextLevel,
    move,
  } = useMazeGame();

  // ── Guard: require registration, then auto-start level 1 ──────────────────
  useEffect(() => {
    if (!userId) {
      router.replace("/");
      return;
    }
    startTransition(() => {
      setReady(true);
      startGame(userId);
    });
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // ── Keyboard controls ──────────────────────────────────────────────────────
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const dir = KEY_MAP[e.key];
      if (dir) {
        e.preventDefault();
        setActiveDir(dir);
        move(dir);
      }
    };
    const onUp = (e: KeyboardEvent) => {
      const dir = KEY_MAP[e.key];
      if (dir) setActiveDir((prev) => (prev === dir ? null : prev));
    };
    globalThis.addEventListener("keydown", onDown);
    globalThis.addEventListener("keyup", onUp);
    return () => {
      globalThis.removeEventListener("keydown", onDown);
      globalThis.removeEventListener("keyup", onUp);
    };
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
    const params = new URLSearchParams({
      userId: userId ?? "",
      name,
      email,
      score: String(totalScore),
    });
    router.push(`/leaderboard?${params.toString()}`);
  }, [router, userId, name, email, totalScore]);

  // Open alert dialog the moment we enter the dead screen
  useEffect(() => {
    if (screen === "dead" && prevScreen.current !== "dead") {
      setDeathAlertOpen(true);
      setShowDeathScreen(false);
    }
    prevScreen.current = screen;
  }, [screen]);

  if (!ready) return null;

  const isBomb = deathReason === "bomb";
  // Compute level score for win screen
  const lastResult = results[results.length - 1];

  return (
    <div
      className="flex flex-1 items-center justify-center bg-background px-4 py-6 font-sans text-foreground sm:px-6"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Death / Timeout alert dialog ──────────────────────────────── */}
      <AlertDialog open={deathAlertOpen} onOpenChange={setDeathAlertOpen}>
        <AlertDialogContent className="max-w-sm border-border bg-card">
          <AlertDialogHeader className="items-center text-center">
            <div
              className={`mb-1 flex h-14 w-14 items-center justify-center rounded-full ${
                isBomb ? "bg-destructive/15" : "bg-chart-4/15"
              }`}
            >
              {isBomb ?
                <Bomb className="size-7 text-destructive" strokeWidth={1.5} />
              : <Clock className="size-7 text-chart-4" strokeWidth={1.5} />}
            </div>
            <AlertDialogTitle
              className={`font-bebas text-3xl tracking-widest ${
                isBomb ? "text-destructive" : "text-chart-4"
              }`}
            >
              {isBomb ? "Bomb Hit!" : "Time\u2019s Up!"}
            </AlertDialogTitle>
            <AlertDialogDescription className="font-marker text-xs tracking-widest text-muted-foreground">
              {isBomb ?
                "You stepped on a bomb. Game over!"
              : "You ran out of time. Better luck next time!"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction
              className="w-full font-semibold"
              onClick={() => {
                setDeathAlertOpen(false);
                goToLeaderboard();
              }}
            >
              View Leaderboard
            </AlertDialogAction>
            <AlertDialogCancel
              className="w-full"
              onClick={() => {
                setDeathAlertOpen(false);
                setShowDeathScreen(true);
              }}
            >
              See Score Breakdown
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
              activeDir={activeDir}
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

        {screen === "dead" && showDeathScreen && (
          <motion.div key="dead" {...slide} className="w-full max-w-3xl">
            <DeathScreen
              reason={deathReason}
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
