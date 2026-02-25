"use client";

import type {
  MazeGrid as MazeGridType,
  Position,
  LevelConfig,
} from "@/types/maze";
import { CELL_SIZE, WALL_WIDTH } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MazeGridProps {
  maze: MazeGridType;
  player: Position;
  levelCfg: LevelConfig;
}

export function MazeGrid({ maze, player, levelCfg }: Readonly<MazeGridProps>) {
  const cs = CELL_SIZE[levelCfg.level] ?? 44;
  const totalWidth = levelCfg.cols * cs + WALL_WIDTH;
  const totalHeight = levelCfg.rows * cs + WALL_WIDTH;

  return (
    <div className="max-w-full overflow-auto rounded-2xl border border-border bg-card/90 p-3 shadow-sm animate-maze-in sm:p-4">
      <div
        className="relative"
        style={{ width: totalWidth, height: totalHeight }}
      >
        {maze.map((row, r) =>
          row.map((cell, c) => {
            const isPlayer = player.r === r && player.c === c;
            const isEnd = r === levelCfg.rows - 1 && c === levelCfg.cols - 1;
            const isStart = r === 0 && c === 0;

            return (
              <div
                key={`${r}-${c}`}
                className={cn(
                  "absolute box-border",
                  isEnd && "bg-chart-2/15",
                  isStart && "bg-chart-4/15",
                )}
                style={{
                  left: c * cs,
                  top: r * cs,
                  width: cs,
                  height: cs,
                  borderTop: `${WALL_WIDTH}px solid ${cell.top ? "var(--border)" : "transparent"}`,
                  borderRight: `${WALL_WIDTH}px solid ${cell.right ? "var(--border)" : "transparent"}`,
                  borderBottom: `${WALL_WIDTH}px solid ${cell.bottom ? "var(--border)" : "transparent"}`,
                  borderLeft: `${WALL_WIDTH}px solid ${cell.left ? "var(--border)" : "transparent"}`,
                }}
              >
                {isEnd && (
                  <span className="absolute top-1/2 left-1/2 z-5 -translate-x-1/2 -translate-y-1/2 text-2xl">
                    🏁
                  </span>
                )}
                {isPlayer && (
                  <div className="absolute top-1/2 left-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-primary/40 animate-player-pulse" />
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
