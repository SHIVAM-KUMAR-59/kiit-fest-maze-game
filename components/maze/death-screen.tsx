"use client";

import { Button } from "@/components/ui/button";
import type { LevelResult } from "@/hooks/use-maze-game";

interface DeathScreenProps {
  totalScore: number;
  results: LevelResult[];
  onFinish: () => void;
}

export function DeathScreen({
  totalScore,
  results,
  onFinish,
}: Readonly<DeathScreenProps>) {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-8">
      <div className="w-full max-w-2xl rounded-4xl border border-destructive/40 bg-card px-5 py-8 text-center animate-win-pop sm:px-8 sm:py-10">
        <span className="mb-2 block text-5xl sm:text-6xl">💥</span>

        <h2 className="font-bebas mb-2 text-4xl tracking-widest text-destructive sm:text-5xl">
          Bomb Hit!
        </h2>
        <p className="font-marker mb-6 text-sm tracking-widest text-muted-foreground">
          You stepped on a bomb. Game over!
        </p>

        {results.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="font-bebas text-lg tracking-wider text-foreground">
              Levels Completed
            </h3>
            {results.map((r, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-2 text-sm"
              >
                <span className="text-muted-foreground">Level {r.level}</span>
                <span className="font-mono font-bold text-secondary">
                  +{r.score}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8 flex flex-col items-center gap-1 rounded-xl bg-muted/60 px-7 py-4">
          <span className="font-mono text-3xl font-bold text-primary">
            {totalScore}
          </span>
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            Total Score
          </span>
        </div>

        <Button onClick={onFinish} className="font-bold tracking-wide">
          View Leaderboard 🏆
        </Button>
      </div>
    </div>
  );
}
