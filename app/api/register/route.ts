import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, email, kfid } = await req.json();

    // Check required fields
    if (!name || !email || !kfid) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, Email and KFID are required",
        },
        { status: 400 },
      );
    }

    // If user with this email already exists, let them play again
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      // If the KFID doesn't match, it's a different person using the same email
      if (existingUser.kfid !== kfid) {
        return NextResponse.json(
          {
            success: false,
            message: "Email already registered with a different KFID",
          },
          { status: 409 },
        );
      }
      // Same person — return their existing account so they can play again
      return NextResponse.json(
        { success: true, message: "Welcome back!", data: existingUser },
        { status: 200 },
      );
    }

    // Check if KFID is taken by a different account
    const existingKfid = await prisma.user.findUnique({ where: { kfid } });
    if (existingKfid) {
      return NextResponse.json(
        {
          success: false,
          message: "KFID already registered with a different email",
        },
        { status: 409 },
      );
    }

    // New user — create record
    const user = await prisma.user.create({ data: { name, email, kfid } });

    return NextResponse.json(
      { success: true, message: "Registration successful", data: user },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    // Unique constraint violation — email or kfid already taken (race condition)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const field = (error.meta?.target as string[])?.join(", ") ?? "field";
      return NextResponse.json(
        { success: false, message: `${field} already registered` },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
