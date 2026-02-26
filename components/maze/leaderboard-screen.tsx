"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isPlayer?: boolean;
}

interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  onPlayAgain: () => void;
}

export function LeaderboardScreen({
  entries,
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
                <th className="px-4 py-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={`${entry.rank}-${entry.name}`}
                  className={`border-t border-border ${
                    entry.isPlayer ? "bg-primary/10 font-bold" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-primary">
                    #{entry.rank}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {entry.name}
                    {entry.isPlayer && (
                      <span className="ml-2 text-xs text-primary">(You)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-secondary">
                    {entry.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button
          onClick={onPlayAgain}
          className="w-full font-semibold tracking-wide sm:w-auto"
        >
          Play Again
        </Button>
      </CardContent>
    </Card>
  );
}
