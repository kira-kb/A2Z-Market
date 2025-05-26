// app/api/register-user/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust this import to match your prisma client path
// import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, phone } = body;

    // const user = await currentUser();
    // if (!user)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // const id = user.id;
    // const email = user.emailAddresses[0]?.emailAddress;
    // const phone = user.phoneNumbers[0]?.phoneNumber;

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 200 }
      );
    }

    // Create user in DB
    const newUser = await prisma.user.create({
      data: {
        id,
        email,
        phone,
      },
    });

    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // console.log("getting users");
    const users = await prisma.user.findMany();
    // console.log("users: ", users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Getting users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, phone, address, country, city, postalCode } = await req.json();

    if (!phone || !id)
      return NextResponse.json(
        { msg: "phone number is mandatory" },
        { status: 403 }
      );

    await prisma.user.updateMany({
      where: { id },
      data: {
        phone,
        address,
        country,
        city,
        postalCode,
        // email,
      },
    });

    return NextResponse.json({ msg: "Info Updated" }, { status: 200 });
  } catch (error) {
    console.error("Updatting users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
