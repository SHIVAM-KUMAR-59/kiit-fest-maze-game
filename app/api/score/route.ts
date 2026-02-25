import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, level, gridSize, timeTaken, points } = await req.json();

    // ✅ Check required fields
    if (!userId || !level || !gridSize || !timeTaken || !points) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Create score
    const score = await prisma.gameScore.create({
      data: {
        userId,
        level,
        gridSize,
        timeTaken,
        points,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Score submitted successfully",
        data: score,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}