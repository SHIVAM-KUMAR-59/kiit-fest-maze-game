"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { LevelConfig } from "@/types/maze";
import { formatTime } from "@/lib/constants";

interface HudProps {
  levelCfg: LevelConfig;
  time: number;
  moves: number;
  onHome: () => void;
}

export function Hud({ levelCfg, time, moves, onHome }: Readonly<HudProps>) {
  return (
    <div className="flex w-full max-w-5xl flex-wrap items-center justify-between gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onHome}
        className="font-marker border-border bg-background/60 text-xs tracking-widest text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        ← Home
      </Button>

      <div className="flex flex-wrap justify-end gap-2">
        <Badge
          variant="outline"
          className="font-marker rounded-full border-border bg-card/70 px-3.5 py-1.5 text-xs tracking-widest text-foreground"
        >
          {levelCfg.label}
        </Badge>
        <Badge
          variant="outline"
          className="font-marker rounded-full border-border bg-card/70 px-3.5 py-1.5 text-xs tracking-widest text-foreground"
        >
          🕐 {formatTime(time)}
        </Badge>
        <Badge
          variant="outline"
          className="font-marker rounded-full border-border bg-card/70 px-3.5 py-1.5 text-xs tracking-widest text-foreground"
        >
          👣 {moves}
        </Badge>
      </div>
    </div>
  );
}
