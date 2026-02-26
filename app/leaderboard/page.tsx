"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  LeaderboardScreen,
  type LeaderboardEntry,
} from "@/components/maze/leaderboard-screen";
import { loadPlayer, clearPlayer } from "@/lib/player-store";

const SAMPLE_ENTRIES: Omit<LeaderboardEntry, "rank">[] = [
  { name: "Ananya", score: 2850 },
  { name: "Rohit", score: 2420 },
  { name: "Sara", score: 1980 },
  { name: "Dev", score: 1650 },
  { name: "Meera", score: 1200 },
];

function LeaderboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [playerData] = useState(() => loadPlayer());

  useEffect(() => {
    if (!playerData) {
      router.replace("/");
    }
  }, [router, playerData]);

  const playerScore = Number(searchParams.get("score") ?? 0);

  const entries = useMemo<LeaderboardEntry[]>(() => {
    const all: Omit<LeaderboardEntry, "rank">[] = [...SAMPLE_ENTRIES];
    if (playerData) {
      all.push({
        name: playerData.name,
        score: playerScore,
        isPlayer: true,
      });
    }
    // Sort descending by score
    all.sort((a, b) => b.score - a.score);
    return all.map((e, i) => ({ ...e, rank: i + 1 }));
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
        <LeaderboardScreen
          entries={entries}
          onPlayAgain={() => {
            clearPlayer();
            router.push("/");
          }}
        />
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
