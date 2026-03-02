import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** GET – Fetch leaderboard (aggregated total scores per user, descending) */
export async function GET() {
  try {
    // Compute total points per session first
    const sessionTotals = await prisma.gameScore.groupBy({
      by: ["userId", "sessionId"],
      _sum: { points: true },
    });

    // Derive best score per user (drop the old attemptsMap from the loop)
    const bestMap = new Map<string, number>();
    for (const s of sessionTotals) {
      const pts = s._sum.points ?? 0;
      const prev = bestMap.get(s.userId) ?? 0;
      if (pts > prev) bestMap.set(s.userId, pts);
    }

    // Sort the users by their best score desc and take top 50
    const sorted = Array.from(bestMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50);

    const userIds = sorted.map(([userId]) => userId);

    // Count full game attempts per user — only completed level-1 sessions
    // (guards against StrictMode double-fires creating phantom sessions)
    const attemptCounts = await prisma.gameSession.groupBy({
      by: ["userId"],
      where: { userId: { in: userIds }, level: 1, completed: true },
      _count: { id: true },
    });
    const attemptsMap = new Map(
      attemptCounts.map((r) => [r.userId, r._count.id]),
    );

    // Fetch user names + emails
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    const entries = sorted.map(([userId, score], idx) => ({
      rank: idx + 1,
      name: userMap.get(userId)?.name ?? "Unknown",
      email: userMap.get(userId)?.email ?? "",
      score,
      attempts: attemptsMap.get(userId) ?? 0,
      userId,
    }));

    return NextResponse.json({ success: true, data: entries });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
