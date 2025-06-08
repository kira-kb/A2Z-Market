// app/api/register-user/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust this import to match your prisma client path

// import { currentUser } from "@clerk/nextjs/server";
// import adminList from "@/lib/adminList.json";

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
    // const allUsers = users.map((user) => {
    //   if (adminList.some((admin) => admin.email == user.email)) {
    //     return { ...user, isAdmin: true };
    //   } else {
    //     return { ...user, isAdmin: false };
    //   }
    // });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Getting users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function PUT(req: Request) {
//   try {
//     const { adminId, userId, userEmail } = await req.json();

//     if (!adminId || !userId || !userEmail)
//       return NextResponse.json(
//         { msg: "cant identify the user" },
//         { status: 400 }
//       );

//     const admin = await prisma.user.findUnique({
//       where: { id: adminId },
//     });

//     if (!admin)
//       return NextResponse.json({ msg: "admin not found" }, { status: 404 });

//     if (!adminList.some((a) => a.email == admin.email))
//       return NextResponse.json(
//         { msg: "You are not authorized to perform this action" },
//         { status: 403 }
//       );

//     const user = await prisma.user.findUnique({
//       where: { id: userId, email: userEmail },
//     });

//     if (!user)
//       return NextResponse.json({ msg: "user not found" }, { status: 404 });

//     const normalAdmin = "kirubelbewket@gmail.com";

//     if (!adminList.some((admin) => admin.email == normalAdmin))
//       adminList.push({ email: normalAdmin });

//     const newList = adminList.some((admin) => admin.email == user.email)
//       ? adminList.filter((admin) => admin.email != user.email)
//       : adminList.push({ email: user.email });

//     await fs.writeFile("@/lib/adminList.json", JSON.stringify(newList));
//   } catch (error) {
//     console.error("cann't change users previlage error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req: Request) {
  try {
    const { adminId, userId, userEmail } = await req.json();

    // Validate inputs
    if (!adminId || !userId || !userEmail) {
      return NextResponse.json(
        { msg: "Missing required identifiers" },
        { status: 400 }
      );
    }

    // Check if admin exists and is authorized
    const admin = await prisma.user.findUnique({ where: { id: adminId } });

    if (!admin) {
      return NextResponse.json({ msg: "Admin not found" }, { status: 404 });
    }

    // const isAuthorized = adminList.some((a) => a.email === admin.email);

    if (!admin.isAdmin) {
      return NextResponse.json(
        { msg: "You are not authorized to perform this action" },
        { status: 403 }
      );
    }

    const masterAdmin = "kirubelbewket@gmail.com";

    // Check if target user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.email !== userEmail || user.email == masterAdmin) {
      return NextResponse.json(
        { msg: "User not found or email mismatch" },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        isAdmin: !user?.isAdmin,
      },
    });

    // // Ensure master admin exists in list
    // const normalAdmin = "kirubelbewket@gmail.com";
    // const adminSet = new Set(adminList.map((admin) => admin.email));
    // adminSet.add(normalAdmin);

    // // Toggle admin privilege
    // if (adminSet.has(user.email)) {
    //   adminSet.delete(user.email);
    // } else {
    //   adminSet.add(user.email);
    // }

    // const newList = Array.from(adminSet).map((email) => ({ email }));

    // // Write updated admin list to file
    // const adminListPath = path.join(process.cwd(), "lib/adminList.json");
    // await fs.writeFile(adminListPath, JSON.stringify(newList, null, 2));

    return NextResponse.json(
      {
        msg: "Admin privileges updated",
        // adminList: newList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Can't change user's privilege error:", error);
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
