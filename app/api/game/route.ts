import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

function getLevelConfig(level: number) {
  switch (level) {
    case 1:
      return { gridSize: 6, timeLimit: 60, bombs: 0 };
    case 2:
      return { gridSize: 8, timeLimit: 90, bombs: 1 };
    case 3:
      return { gridSize: 10, timeLimit: 105, bombs: 2 };
    default:
      return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { level, userId } = body;

    if (!userId || level === undefined) {
      return NextResponse.json(
        { success: false, message: "Level and userId required" },
        { status: 400 },
      );
    }

    const config = getLevelConfig(level);

    if (!config) {
      return NextResponse.json(
        { success: false, message: "Invalid level" },
        { status: 400 },
      );
    }

    const session = await prisma.gameSession.create({
      data: {
        userId,
        level,
        gridSize: config.gridSize,
        timeLimit: config.timeLimit,
        bombs: config.bombs,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Game initialized",
      data: {
        sessionId: session.id,
        level,
        gridSize: config.gridSize,
        timeLimit: config.timeLimit,
        bombs: config.bombs,
      },
    });
  } catch (error) {
    console.error(error);

    // P2003 – FK violation: userId doesn't exist in User table
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
