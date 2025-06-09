import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ msg: "Email is required" }, { status: 400 });
    }

    const subscriber = await prisma.subscription.findUnique({
      where: { email },
      select: {
        email: true,
        notification: true,
      },
    });

    return NextResponse.json(subscriber, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ msg: "Email is required" }, { status: 400 });
    }

    await prisma.subscription.create({
      data: { email },
    });

    return NextResponse.json({ msg: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { email, notification } = await req.json();

    console.log(email, notification);

    if (!email) {
      return NextResponse.json({ msg: "Email is required" }, { status: 400 });
    }

    // if (!notification)
    //   return NextResponse.json(
    //     { msg: "Notification is required" },
    //     { status: 400 }
    //   );

    await prisma.subscription.update({
      where: { email },
      data: { notification: notification },
    });

    return NextResponse.json({ msg: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
