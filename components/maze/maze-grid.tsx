"use client";

import { Bomb, Flag } from "lucide-react";
import type {
  MazeGrid as MazeGridType,
  Position,
  LevelConfig,
} from "@/types/maze";
import { BLOCK_CELL_SIZE, FOG_RADIUS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MazeGridProps {
  maze: MazeGridType;
  player: Position;
  levelCfg: LevelConfig;
}

export function MazeGrid({ maze, player, levelCfg }: Readonly<MazeGridProps>) {
  const bs = BLOCK_CELL_SIZE[levelCfg.level] ?? 22;

  // Block-grid dimensions (2×rows+1) × (2×cols+1)
  const blockCols = maze[0]?.length ?? 0;

  // Player & landmark block positions  (logical n → block 2n+1)
  const playerBR = 2 * player.r + 1;
  const playerBC = 2 * player.c + 1;
  const endBR = 2 * (levelCfg.rows - 1) + 1;
  const endBC = 2 * (levelCfg.cols - 1) + 1;

  // fog radius in block-cell units (1 logical cell = 2 block cells)
  const fogRange = FOG_RADIUS * 2;

  const isVisible = (br: number, bc: number) => {
    if (br === endBR && bc === endBC) return true; // destination always on
    return (
      Math.abs(br - playerBR) <= fogRange && Math.abs(bc - playerBC) <= fogRange
    );
  };

  const iconSize = Math.max(10, Math.floor(bs * 0.6));

  return (
    <div className="max-w-full overflow-auto rounded-2xl border border-border bg-background p-3 shadow-sm animate-maze-in sm:p-4">
      <div
        className="relative"
        style={{ width: blockCols * bs, height: maze.length * bs }}
      >
        {maze.map((row, br) =>
          row.map((cell, bc) => {
            const visible = isVisible(br, bc);
            const isPlayerCell = br === playerBR && bc === playerBC;
            const isEnd = br === endBR && bc === endBC;
            const isBomb = cell.hasBomb && visible && !isPlayerCell;

            return (
              <div
                key={`${br}-${bc}`}
                className={cn(
                  "absolute flex items-center justify-center transition-colors duration-200",
                  !visible && "bg-muted/90",
                  visible && cell.isWall && "bg-muted rounded-[2px]",
                  visible && !cell.isWall && isEnd && "bg-secondary/20",
                  visible && !cell.isWall && isBomb && "bg-destructive/20",
                  visible &&
                    !cell.isWall &&
                    !isEnd &&
                    !isBomb &&
                    "bg-background",
                )}
                style={{
                  left: bc * bs,
                  top: br * bs,
                  width: bs,
                  height: bs,
                }}
              >
                {isEnd && visible && (
                  <Flag
                    style={{ width: iconSize, height: iconSize }}
                    className="text-secondary animate-pulse"
                    strokeWidth={2}
                  />
                )}
                {isBomb && (
                  <Bomb
                    style={{ width: iconSize, height: iconSize }}
                    className="text-destructive"
                    strokeWidth={2}
                  />
                )}
                {isPlayerCell && (
                  <div
                    className="rounded-full bg-primary ring-2 ring-primary/40 animate-player-pulse"
                    style={{ width: bs * 0.65, height: bs * 0.65 }}
                  />
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
