import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** GET – Fetch leaderboard (aggregated total scores per user, descending) */
export async function GET() {
  try {
    // Aggregate total points per user
    const rows = await prisma.gameScore.groupBy({
      by: ["userId"],
      _sum: { points: true },
      orderBy: { _sum: { points: "desc" } },
      take: 50,
    });

    // Fetch user names
    const userIds = rows.map((r) => r.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true },
    });

    const nameMap = new Map(users.map((u) => [u.id, u.name]));

    const entries = rows.map((r, i) => ({
      rank: i + 1,
      name: nameMap.get(r.userId) ?? "Unknown",
      score: r._sum.points ?? 0,
      userId: r.userId,
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
