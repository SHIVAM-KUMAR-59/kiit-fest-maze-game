"use client";

import type { LevelConfig } from "@/types/maze";
import { LEVELS } from "@/lib/constants";

interface HomeScreenProps {
  onStartLevel: (cfg: LevelConfig) => void;
}

export function HomeScreen({ onStartLevel }: Readonly<HomeScreenProps>) {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-3xl border border-border bg-card/90 p-4 shadow-sm sm:p-6">
      <div className="text-center">
        <span className="mb-2 block text-4xl sm:text-5xl">🌀</span>
        <h1 className="font-bebas text-[clamp(3rem,12vw,5rem)] tracking-widest text-foreground drop-shadow-[0_0_15px_rgba(219,48,99,0.3)]">
          MAZE<span className="text-primary">RUN</span>
        </h1>
        <p className="font-marker mt-2 text-xs tracking-[0.2em] text-muted-foreground uppercase sm:text-sm">
          Find the exit. Beat the clock.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        {LEVELS.map((cfg) => (
          <button
            key={cfg.level}
            className="grid cursor-pointer grid-cols-[40px_1fr_auto] gap-3 rounded-xl border border-border bg-muted/40 px-4 py-4 text-left transition-all hover:border-primary hover:bg-accent active:scale-[0.98] sm:grid-cols-[48px_1fr_auto_auto] sm:px-6 sm:py-5"
            onClick={() => onStartLevel(cfg)}
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-base font-bold text-primary sm:size-10 sm:text-lg">
              {cfg.level}
            </span>
            <span className="text-sm font-bold tracking-wide text-foreground sm:text-base">
              {cfg.label}
            </span>
            <span className="text-xs tracking-wider text-muted-foreground sm:block hidden">
              {cfg.sub}
            </span>
            <span className="text-lg text-primary sm:text-xl">→</span>
          </button>
        ))}
      </div>

      <p className="text-center text-xs tracking-wide text-muted-foreground">
        Arrow keys or WASD to move · Swipe on mobile
      </p>
    </div>
  );
}
