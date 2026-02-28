import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/** POST – Submit a score for a completed level */
export async function POST(req: Request) {
  try {
    const { userId, sessionId, level, gridSize, timeTaken, points } =
      await req.json();

    if (!userId || !sessionId || !level || !timeTaken || points === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Mark session completed (use updateMany so missing session doesn't throw)
    await prisma.gameSession.updateMany({
      where: { id: sessionId },
      data: { completed: true },
    });

    // Upsert score (one per session)
    const score = await prisma.gameScore.upsert({
      where: { sessionId },
      update: { timeTaken, points },
      create: {
        userId,
        sessionId,
        level,
        gridSize:
          gridSize ??
          (level === 1 ? 6
          : level === 2 ? 8
          : 10),
        timeTaken,
        points,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Score saved",
      data: score,
    });
  } catch (error) {
    console.error("Score submit error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2003 – FK constraint (sessionId doesn't exist in GameSession)
      if (error.code === "P2003") {
        return NextResponse.json(
          { success: false, message: "Invalid session ID" },
          { status: 400 },
        );
      }
      // P2002 – unique constraint (score already recorded for this session)
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            success: false,
            message: "Score already recorded for this session",
          },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
