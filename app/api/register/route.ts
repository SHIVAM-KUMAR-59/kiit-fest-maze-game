import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const verifyKfid = async (kfid: string): Promise<boolean> => {
  const API_URL = "https://pvs.kiitfest.org/api/validate";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kfid }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data?.success === true;
  } catch (error) {
    console.error("KFID validation failed:", error);
    return false;
  }
};

export async function POST(req: Request) {
  try {
    const { name, email, kfid } = await req.json();

    // Validate input
    if (!name || !email || !kfid) {
      return NextResponse.json(
        { success: false, message: "Name, Email and KFID are required" },
        { status: 400 }
      );
    }

    // verify KFID (avoid unnecessary DB queries)
    const isValidKfid = await verifyKfid(kfid);

    if (!isValidKfid) {
      return NextResponse.json(
        { success: false, message: "You have not registered." },
        { status: 403 }
      );
    }

    // Check existing email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.kfid !== kfid) {
        return NextResponse.json(
          {
            success: false,
            message: "Email already registered with a different KFID",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { success: true, message: "Welcome back!", data: existingUser },
        { status: 200 }
      );
    }

    // Check existing KFID
    const existingKfid = await prisma.user.findUnique({
      where: { kfid },
    });

    if (existingKfid) {
      return NextResponse.json(
        {
          success: false,
          message: "KFID already registered with a different email",
        },
        { status: 409 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: { name, email, kfid },
    });

    return NextResponse.json(
      { success: true, message: "Registration successful", data: user },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const field =
        (error.meta?.target as string[])?.join(", ") ?? "field";

      return NextResponse.json(
        { success: false, message: `${field} already registered` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}