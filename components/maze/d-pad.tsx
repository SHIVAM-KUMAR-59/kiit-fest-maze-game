"use client";

import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Direction } from "@/types/maze";
import { cn } from "@/lib/utils";

interface DPadProps {
  onMove: (dir: Direction) => void;
  /** Direction currently held on the keyboard (desktop highlight). */
  activeDir?: Direction | null;
}

export function DPad({ onMove, activeDir }: Readonly<DPadProps>) {
  // onPointerDown only — prevents the "double-move" caused by the browser
  // synthesising a click after a touch, and gives instant response.
  const handleDir = (dir: Direction) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMove(dir);
  };

  const btnBase =
    "relative size-12 rounded-[10px] border-border bg-card/80 p-0 text-muted-foreground transition-all duration-75 hover:bg-accent hover:text-foreground sm:size-13";

  const activeStyle =
    "border-primary bg-primary/20 text-primary scale-95 shadow-[0_0_12px_2px_var(--color-primary)]";

  return (
    <div className="grid grid-cols-[repeat(3,48px)] grid-rows-[repeat(3,48px)] gap-1 sm:grid-cols-[repeat(3,52px)] sm:grid-rows-[repeat(3,52px)]">
      <Button
        variant="outline"
        className={cn(
          btnBase,
          "col-start-2 row-start-1",
          activeDir === "up" && activeStyle,
        )}
        onPointerDown={handleDir("up")}
        aria-label="Move up"
      >
        <ChevronUp className="size-5" />
      </Button>
      <Button
        variant="outline"
        className={cn(
          btnBase,
          "col-start-1 row-start-2",
          activeDir === "left" && activeStyle,
        )}
        onPointerDown={handleDir("left")}
        aria-label="Move left"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <Button
        variant="outline"
        className={cn(
          btnBase,
          "col-start-3 row-start-2",
          activeDir === "right" && activeStyle,
        )}
        onPointerDown={handleDir("right")}
        aria-label="Move right"
      >
        <ChevronRight className="size-5" />
      </Button>
      <Button
        variant="outline"
        className={cn(
          btnBase,
          "col-start-2 row-start-3",
          activeDir === "down" && activeStyle,
        )}
        onPointerDown={handleDir("down")}
        aria-label="Move down"
      >
        <ChevronDown className="size-5" />
      </Button>
    </div>
  );
}
