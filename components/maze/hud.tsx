"use client";

import { Badge } from "@/components/ui/badge";
import type { LevelConfig } from "@/types/maze";
import { formatTime } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface HudProps {
  levelCfg: LevelConfig;
  time: number;
  moves: number;
}

export function Hud({ levelCfg, time, moves }: Readonly<HudProps>) {
  const timeLeft = Math.max(0, levelCfg.timeLimit - time);
  const isUrgent = timeLeft <= 10;
  const isWarning = timeLeft <= 20 && !isUrgent;

  return (
    <div className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-2">
      <Badge
        variant="outline"
        className="font-marker rounded-full border-border bg-card/70 px-3.5 py-1.5 text-xs tracking-widest text-foreground"
      >
        {levelCfg.label}
      </Badge>
      <Badge
        variant="outline"
        className={cn(
          "font-marker rounded-full px-3.5 py-1.5 text-xs tracking-widest",
          isUrgent ?
            "border-destructive bg-destructive/20 text-destructive animate-pulse"
          : isWarning ? "border-chart-4 bg-chart-4/15 text-chart-4"
          : "border-border bg-card/70 text-foreground",
        )}
      >
        ⏱ {formatTime(timeLeft)}
      </Badge>
      <Badge
        variant="outline"
        className="font-marker rounded-full border-border bg-card/70 px-3.5 py-1.5 text-xs tracking-widest text-foreground"
      >
        👣 {moves}
      </Badge>
    </div>
  );
}
