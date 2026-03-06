"use client";

import Image from "next/image";
import { Bomb, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LevelResult } from "@/hooks/use-maze-game";

interface DeathScreenProps {
  reason: "bomb" | "timeout";
  totalScore: number;
  results: LevelResult[];
  onFinish: () => void;
}

export function DeathScreen({
  reason,
  totalScore,
  results,
  onFinish,
}: Readonly<DeathScreenProps>) {
  const isBomb = reason === "bomb";

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6">
      <div
        className={`w-full max-w-2xl rounded-4xl border bg-card px-5 py-8 text-center animate-win-pop sm:px-8 sm:py-10 ${
          isBomb ? "border-destructive/40" : "border-chart-4/40"
        }`}
      >
        <div className="mb-2 flex justify-center">
          {isBomb ?
            <Bomb
              className="size-14 text-destructive sm:size-16"
              strokeWidth={1.5}
            />
          : <Clock
              className="size-14 text-chart-4 sm:size-16"
              strokeWidth={1.5}
            />
          }
        </div>

        <h2
          className={`font-bebas mb-2 text-4xl tracking-widest sm:text-5xl ${
            isBomb ? "text-destructive" : "text-chart-4"
          }`}
        >
          {isBomb ? "Bomb Hit!" : "Time\u2019s Up!"}
        </h2>
        <p className="font-marker mb-6 text-sm tracking-widest text-muted-foreground">
          {isBomb ?
            "You stepped on a bomb. Game over!"
          : "You ran out of time. Better luck next time!"}
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

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onFinish();
          }}
          className="inline-flex items-center gap-2 font-bold tracking-wide"
        >
          <Trophy className="size-4" /> View Leaderboard
        </Button>
      </div>

      {/* Wordmark footer */}
      <Image
        src="/kiitfest-wordmark.png"
        alt="KIIT Fest"
        width={160}
        height={32}
        className="w-32 object-contain opacity-40"
      />
    </div>
  );
}
