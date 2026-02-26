"use client";

import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Direction } from "@/types/maze";

interface DPadProps {
  onMove: (dir: Direction) => void;
}

export function DPad({ onMove }: Readonly<DPadProps>) {
  return (
    <div className="grid grid-cols-[repeat(3,48px)] grid-rows-[repeat(3,48px)] gap-1 sm:grid-cols-[repeat(3,52px)] sm:grid-rows-[repeat(3,52px)]">
      <Button
        variant="outline"
        className="col-start-2 row-start-1 size-12 rounded-[10px] border-border bg-card/80 p-0 text-muted-foreground hover:bg-accent hover:text-foreground sm:size-13"
        onClick={() => onMove("up")}
        aria-label="Move up"
      >
        <ChevronUp className="size-5" />
      </Button>
      <Button
        variant="outline"
        className="col-start-1 row-start-2 size-12 rounded-[10px] border-border bg-card/80 p-0 text-muted-foreground hover:bg-accent hover:text-foreground sm:size-13"
        onClick={() => onMove("left")}
        aria-label="Move left"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <Button
        variant="outline"
        className="col-start-3 row-start-2 size-12 rounded-[10px] border-border bg-card/80 p-0 text-muted-foreground hover:bg-accent hover:text-foreground sm:size-13"
        onClick={() => onMove("right")}
        aria-label="Move right"
      >
        <ChevronRight className="size-5" />
      </Button>
      <Button
        variant="outline"
        className="col-start-2 row-start-3 size-12 rounded-[10px] border-border bg-card/80 p-0 text-muted-foreground hover:bg-accent hover:text-foreground sm:size-13"
        onClick={() => onMove("down")}
        aria-label="Move down"
      >
        <ChevronDown className="size-5" />
      </Button>
    </div>
  );
}
