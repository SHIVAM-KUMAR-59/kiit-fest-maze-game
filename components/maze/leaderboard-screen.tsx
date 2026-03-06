"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const MEDALS: Record<
  number,
  {
    emoji: string;
    label: string;
    rowClass: string;
    rankClass: string;
    glow: string;
  }
> = {
  1: {
    emoji: "🥇",
    label: "Gold",
    rowClass: "bg-yellow-500/10 border-yellow-400/40",
    rankClass: "text-yellow-400",
    glow: "shadow-[inset_0_0_16px_2px_rgba(234,179,8,0.12)]",
  },
  2: {
    emoji: "🥈",
    label: "Silver",
    rowClass: "bg-slate-400/10 border-slate-300/40",
    rankClass: "text-slate-300",
    glow: "shadow-[inset_0_0_16px_2px_rgba(148,163,184,0.12)]",
  },
  3: {
    emoji: "🥉",
    label: "Bronze",
    rowClass: "bg-orange-600/10 border-orange-400/40",
    rankClass: "text-orange-400",
    glow: "shadow-[inset_0_0_16px_2px_rgba(234,88,12,0.12)]",
  },
};

export interface LeaderboardEntry {
  rank: number;
  name: string;
  email?: string;
  score: number;
  attempts?: number;
  isPlayer?: boolean;
}

interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  lastUpdated?: Date | null;
  countdown?: number;
  onPlayAgain?: () => void;
}

export function LeaderboardScreen({
  entries,
  lastUpdated,
  countdown,
  onPlayAgain,
}: Readonly<LeaderboardScreenProps>) {
  return (
    <Card className="w-full max-w-3xl border-border bg-card/90 shadow-sm animate-screen-fade">
      <CardHeader className="space-y-3">
        <div className="text-center">
          <span className="text-4xl">🏆</span>
          <CardTitle className="font-bebas mt-1 text-4xl tracking-widest sm:text-5xl">
            Leaderboard
          </CardTitle>
          <CardDescription className="font-marker text-sm tracking-widest">
            Top maze challengers ranked by score.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[400px] border-collapse text-left text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3 text-center">Attempts</th>
                <th className="px-4 py-3 text-right">Best Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const medal = MEDALS[entry.rank];
                return (
                  <tr
                    key={`${entry.rank}-${entry.name}`}
                    className={[
                      "border-t",
                      medal ?
                        `${medal.rowClass} ${medal.glow}`
                      : "border-border",
                      entry.isPlayer && !medal ? "bg-primary/10 font-bold" : "",
                      entry.isPlayer && medal ?
                        "ring-1 ring-inset ring-primary/40"
                      : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <td
                      className={`px-4 py-3 font-semibold ${medal ? medal.rankClass : "text-primary"}`}
                    >
                      {medal ?
                        <span className="flex items-center gap-1.5">
                          <span className="text-base leading-none">
                            {medal.emoji}
                          </span>
                          <span className="tabular-nums">#{entry.rank}</span>
                        </span>
                      : `#${entry.rank}`}
                    </td>
                    <td
                      className={`px-4 py-3 font-medium ${medal ? "text-foreground font-semibold" : "text-foreground"}`}
                    >
                      <div className="flex flex-col">
                        <span>
                          {entry.name}
                          {entry.isPlayer && (
                            <span className="ml-2 text-xs text-primary">
                              (You)
                            </span>
                          )}
                        </span>
                        {entry.email && (
                          <span className="text-xs text-muted-foreground font-normal">
                            {entry.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center tabular-nums text-muted-foreground">
                      {entry.attempts ?? "—"}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-mono font-bold ${medal?.rankClass ?? "text-secondary"}`}
                    >
                      {entry.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          {onPlayAgain && (
            <Button
              onClick={onPlayAgain}
              className="font-semibold tracking-wide"
            >
              Play Again
            </Button>
          )}
          <div className="ml-auto flex flex-col items-end gap-0.5">
            {lastUpdated && (
              <p className="text-xs text-muted-foreground">
                Updated {lastUpdated.toLocaleTimeString()}
              </p>
            )}
            {countdown !== undefined && (
              <p className="text-xs text-muted-foreground">
                Refreshing in{" "}
                <span
                  className={`font-mono font-semibold tabular-nums ${
                    countdown <= 5 ? "text-secondary" : "text-accent"
                  }`}
                >
                  {countdown}s
                </span>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
