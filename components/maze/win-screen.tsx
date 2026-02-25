"use client";

import { Button } from "@/components/ui/button";
import type { LevelConfig, Star } from "@/types/maze";
import { formatTime } from "@/lib/constants";

interface WinScreenProps {
  levelCfg: LevelConfig;
  stars: Star[];
  time: number;
  moves: number;
  onRetry: () => void;
  onNextLevel: () => void;
  onHome: () => void;
}

export function WinScreen({
  levelCfg,
  stars,
  time,
  moves,
  onRetry,
  onNextLevel,
  onHome,
}: Readonly<WinScreenProps>) {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-8">
      <div className="w-full max-w-2xl rounded-4xl border border-border bg-card px-5 py-8 text-center animate-win-pop sm:px-8 sm:py-10">
        <span className="mb-2 block text-5xl sm:text-6xl">🎉</span>

        <h2 className="font-bebas mb-4 text-4xl tracking-widest text-foreground sm:text-5xl">
          Maze Solved!
        </h2>

        <div className="mb-6 text-4xl">
          {stars.map((s, i) => (
            <span
              key={i}
              className={
                s === "★" ?
                  "mx-0.5 text-chart-4"
                : "mx-0.5 text-muted-foreground"
              }
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="flex flex-col items-center gap-1 rounded-xl bg-muted/60 px-7 py-4">
            <span className="font-mono text-3xl font-bold text-primary">
              {formatTime(time)}
            </span>
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Time
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl bg-muted/60 px-7 py-4">
            <span className="font-mono text-3xl font-bold text-primary">
              {moves}
            </span>
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Moves
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          <Button onClick={onRetry} className="font-bold tracking-wide">
            ↺ Retry
          </Button>
          {levelCfg.level < 3 && (
            <Button
              variant="secondary"
              onClick={onNextLevel}
              className="font-bold tracking-wide"
            >
              Next Level →
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={onHome}
            className="border border-border text-muted-foreground hover:text-foreground"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
