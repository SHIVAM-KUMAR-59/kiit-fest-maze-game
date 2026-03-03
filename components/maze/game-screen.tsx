"use client";

import type {
  MazeGrid as MazeGridType,
  Position,
  Direction,
  LevelConfig,
} from "@/types/maze";
import { Hud } from "./hud";
import { MazeGrid } from "./maze-grid";
import { DPad } from "./d-pad";

interface GameScreenProps {
  maze: MazeGridType;
  player: Position;
  levelCfg: LevelConfig;
  time: number;
  moves: number;
  onMove: (dir: Direction) => void;
  /** Currently held keyboard direction (for D-Pad highlight on desktop). */
  activeDir?: Direction | null;
}

export function GameScreen({
  maze,
  player,
  levelCfg,
  time,
  moves,
  onMove,
  activeDir,
}: Readonly<GameScreenProps>) {
  return (
    <div className="flex flex-col sm:flex-row items-center max-w-6xl mx-auto justify-center gap-3 w-full">
      <div className="space-y-3 flex flex-col items-center justify-center w-full">
        <Hud levelCfg={levelCfg} time={time} moves={moves} />
        <MazeGrid maze={maze} player={player} levelCfg={levelCfg} />
      </div>
      <div className="flex justify-center w-full">
        <DPad onMove={onMove} activeDir={activeDir} />
      </div>
    </div>
  );
}
