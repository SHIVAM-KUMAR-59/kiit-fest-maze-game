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
  level: string;
  time: string;
  moves: number;
}

interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  onStart: () => void;
}

export function LeaderboardScreen({
  entries,
  onStart,
}: Readonly<LeaderboardScreenProps>) {
  return (
    <Card className="w-full max-w-3xl border-border bg-card/90 shadow-sm animate-screen-fade">
      <CardHeader className="space-y-3">
        <div className="text-center">
          <span className="text-4xl">🏆</span>
          <CardTitle className="font-bebas mt-1 text-4xl tracking-widest sm:text-5xl">
            Demo Leaderboard
          </CardTitle>
          <CardDescription className="font-marker text-sm tracking-widest">
            Static sample data for now. This will be wired to backend later.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Best Level</th>
                <th className="px-4 py-3">Best Time</th>
                <th className="px-4 py-3">Moves</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={`${entry.rank}-${entry.name}`}
                  className="border-t border-border"
                >
                  <td className="px-4 py-3 font-semibold text-primary">
                    #{entry.rank}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {entry.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.level}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.time}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.moves}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button
          onClick={onStart}
          className="w-full font-semibold tracking-wide sm:w-auto"
        >
          Start Maze Challenge
        </Button>
      </CardContent>
    </Card>
  );
}
