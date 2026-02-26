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
}

export function GameScreen({
  maze,
  player,
  levelCfg,
  time,
  moves,
  onMove,
}: Readonly<GameScreenProps>) {
  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <Hud levelCfg={levelCfg} time={time} moves={moves} />
      <MazeGrid maze={maze} player={player} levelCfg={levelCfg} />
      <DPad onMove={onMove} />
    </div>
  );
}
