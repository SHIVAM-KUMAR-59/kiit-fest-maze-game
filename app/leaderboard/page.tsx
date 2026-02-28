"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  LeaderboardScreen,
  type LeaderboardEntry,
} from "@/components/maze/leaderboard-screen";
import { loadPlayer, clearPlayer } from "@/lib/player-store";

function LeaderboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [playerData] = useState(() => loadPlayer());
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerData) {
      router.replace("/");
      return;
    }
  }, [router, playerData]);

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
              score: number;
              userId: string;
            }) => ({
              rank: e.rank,
              name: e.name,
              score: e.score,
              isPlayer: playerData ? e.userId === playerData.id : false,
            }),
          );

          // If the current player isn't in the DB results yet (score not yet aggregated),
          // add them manually using the ?score= param
          const hasPlayer = mapped.some((e) => e.isPlayer);
          if (!hasPlayer && playerData && playerScore > 0) {
            mapped.push({
              rank: 0,
              name: playerData.name,
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
        if (playerData) {
          setEntries([
            {
              rank: 1,
              name: playerData.name,
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
  }, [playerData, playerScore]);

  if (!playerData) return null;

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
            onPlayAgain={() => {
              clearPlayer();
              router.push("/");
            }}
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
