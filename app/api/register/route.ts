import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    //  Check empty fields
    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and Email required" },
        { status: 400 }
      );
    }

    // KIIT Email validation
    const kiitEmailRegex = /^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$/;

    if (!kiitEmailRegex.test(email)) {
      return NextResponse.json(
        { message: "Only KIIT email allowed" },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already registered" },
        { status: 409 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(
      { message: "Registration successful", user },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}