import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const verifyKfid = async (kfid: string) => {
  const API_URL = "https://pvs.kiitfest.org/api/validate";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kfid }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("KFID validation failed:", error);
    return false;
  }
};

export async function POST(req: Request) {
  try {
    const { kfid } = await req.json();

    // Validate input
    if (!kfid) {
      return NextResponse.json(
        { success: false, message: "KFID is required" },
        { status: 400 },
      );
    }

    // Verify KFID and fetch name + email from the KIIT Fest service
    const kfidData = await verifyKfid(kfid);

    if (!kfidData || !kfidData.paid) {
      return NextResponse.json(
        { success: false, message: "Invalid KFID. You have not registered." },
        { status: 403 },
      );
    }

    const name: string = kfidData.name ?? kfidData.fullName ?? "";
    const email: string = kfidData.email ?? "";

    // If this KFID is already in our DB, return the existing user (welcome back)
    const existingUser = await prisma.user.findUnique({ where: { kfid } });
    if (existingUser) {
      return NextResponse.json(
        { success: true, message: "Welcome back!", data: existingUser },
        { status: 200 },
      );
    }

    // New user — create with data from the KFID service
    const user = await prisma.user.create({
      data: { name, email, kfid },
    });

    return NextResponse.json(
      { success: true, message: "Registration successful", data: user },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

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
