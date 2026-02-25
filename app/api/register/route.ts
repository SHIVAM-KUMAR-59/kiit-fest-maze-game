import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
        { status: 400 }
      );
    }

    // KIIT Email validation
    const kiitEmailRegex = /^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$/;

    if (!kiitEmailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only KIIT email allowed",
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered",
        },
        { status: 409 }
      );
    }

    // Check if KFID already exists
    const existingKfid = await prisma.user.findUnique({
      where: { kfid },
    });

    if (existingKfid) {
      return NextResponse.json(
        {
          success: false,
          message: "KFID already registered",
        },
        { status: 409 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        kfid,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        data: user,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}