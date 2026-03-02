"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  LeaderboardScreen,
  type LeaderboardEntry,
} from "@/components/maze/leaderboard-screen";

function LeaderboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const playerName = searchParams.get("name") ?? "";
  const playerEmail = searchParams.get("email") ?? "";
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      router.replace("/");
      return;
    }
  }, [router, userId]);

  const playerScore = Number(searchParams.get("score") ?? 0);

  // Fetch leaderboard from API
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          // Mark the current player
          const mapped: LeaderboardEntry[] = data.data.map(
            (e: {
              rank: number;
              name: string;
              email: string;
              score: number;
              attempts: number;
              userId: string;
            }) => ({
              rank: e.rank,
              name: e.name,
              email: e.email,
              score: e.score,
              attempts: e.attempts,
              isPlayer: e.userId === userId,
            }),
          );

          // If the current player isn't in the DB results yet (score not yet aggregated),
          // add them manually using the ?score= param
          const hasPlayer = mapped.some((e) => e.isPlayer);
          if (!hasPlayer && userId && playerScore > 0) {
            mapped.push({
              rank: 0,
              name: playerName,
              email: playerEmail,
              score: playerScore,
              isPlayer: true,
            });
            // Re-sort and re-rank
            mapped.sort((a, b) => b.score - a.score);
            mapped.forEach((e, i) => (e.rank = i + 1));
          }

          setEntries(mapped);
        }
      } catch {
        // Fallback: show just the player
        if (userId) {
          setEntries([
            {
              rank: 1,
              name: playerName,
              email: playerEmail,
              score: playerScore,
              isPlayer: true,
            },
          ]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [userId, playerScore]);

  if (!userId) return null;

  return (
    <div className="flex flex-1 items-center justify-center bg-background px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        {loading ?
          <div className="flex items-center justify-center py-20">
            <span className="font-marker text-sm tracking-widest text-muted-foreground animate-pulse">
              Loading leaderboard...
            </span>
          </div>
        : <LeaderboardScreen
            entries={entries}
            onPlayAgain={() => router.push("/")}
          />
        }
      </motion.div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <Suspense>
      <LeaderboardContent />
    </Suspense>
  );
}
