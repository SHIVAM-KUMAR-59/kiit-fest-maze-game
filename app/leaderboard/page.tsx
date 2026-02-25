"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LeaderboardScreen,
  type LeaderboardEntry,
} from "@/components/maze/leaderboard-screen";
import { loadPlayer } from "@/lib/player-store";

const SAMPLE_ENTRIES: LeaderboardEntry[] = [
  { rank: 1, name: "Ananya", level: "Level 3", time: "00:43", moves: 68 },
  { rank: 2, name: "Rohit", level: "Level 3", time: "00:49", moves: 72 },
  { rank: 3, name: "Sara", level: "Level 2", time: "00:36", moves: 45 },
  { rank: 4, name: "Dev", level: "Level 2", time: "00:39", moves: 53 },
  { rank: 5, name: "Meera", level: "Level 1", time: "00:19", moves: 21 },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const [playerData] = useState(() => {
    const player = loadPlayer();
    return player;
  });

  useEffect(() => {
    if (!playerData) {
      router.replace("/");
    }
  }, [router, playerData]);

  const entries = useMemo<LeaderboardEntry[]>(() => {
    if (!playerData) return SAMPLE_ENTRIES;
    return [
      {
        rank: 6,
        name: playerData.name,
        level: "Pending",
        time: "--:--",
        moves: 0,
      },
      ...SAMPLE_ENTRIES,
    ];
  }, [playerData]);

  if (!playerData) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <LeaderboardScreen
          entries={entries}
          onStart={() => router.push("/game")}
        />
      </motion.div>
    </div>
  );
}
