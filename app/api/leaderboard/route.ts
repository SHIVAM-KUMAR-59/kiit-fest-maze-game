import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leaderboard = await prisma.gameScore.findMany({
      orderBy: {
        points: "desc",
      },
      include: {
        user: true,
      },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      data: leaderboard,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}