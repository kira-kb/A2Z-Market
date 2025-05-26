import { PrismaClient } from "@/prisma/lib/generatedPrismaClient";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// POST: Create or get cart
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Ensure user exists to avoid foreign key error
    // const userExists = await prisma.user.findUnique({ where: { id: userId } });
    // if (!userExists) {
    //   await prisma.user.create({
    //     data: { id: userId },
    //   });
    // }

    const existing = await prisma.cart.findUnique({ where: { userId } });

    if (existing) return NextResponse.json(existing);

    const newCart = await prisma.cart.create({ data: { userId } });
    return NextResponse.json(newCart);
  } catch (err) {
    console.error("POST /cart error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Get cart with items
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ msg: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (err) {
    console.error("GET /cart error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Add or update item
export async function PUT(req: Request) {
  try {
    const { cartId, productId, quantity } = await req.json();

    if (!cartId || !productId || !quantity) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
      return NextResponse.json(updated);
    }

    const newItem = await prisma.cartItem.create({
      data: { cartId, productId, quantity },
    });

    return NextResponse.json(newItem);
  } catch (err) {
    console.error("PUT /cart error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Update quantity
export async function PATCH(req: Request) {
  try {
    const { itemId, quantity } = await req.json();

    if (!itemId || quantity === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /cart error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove item or full cart
export async function DELETE(req: Request) {
  try {
    const { itemId, userId } = await req.json();

    console.log("deleting: ", itemId, userId);

    if (itemId) {
      await prisma.cartItem.delete({ where: { id: itemId } });
      return NextResponse.json({ message: "Item removed" }, { status: 200 });
    }

    if (userId) {
      await prisma.cart.delete({ where: { userId } });
      return NextResponse.json({ message: "Cart deleted" }, { status: 200 });
    }

    console.log("Provide itemId and userId");

    return NextResponse.json(
      { error: "Provide itemId and userId" },
      { status: 400 }
    );
  } catch (err) {
    console.error("DELETE /cart error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ??????????????????????????????????????????????????????????????????????
// ??????????????????????????????????????????????????????????????????????
// ??????????????????????????????????????????????????????????????????????

// import { PrismaClient } from "@/prisma/lib/generatedPrismaClient";
// import { NextResponse } from "next/server";
// // import { z } from 'zod';
// // import { Prisma } from '@/prisma/lib/generatedPrismaClient';
// // import { p } from '@/prisma/lib/generatedPrismaClient';

// // Create or get cart

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   // const { userId } = await req.json();

//   const { searchParams } = new URL(req.url);

//   const userId = searchParams.get("userId");

//   if (!userId) {
//     return NextResponse.json({ error: "User ID required" }, { status: 400 });
//   }

//   const existing = await prisma.cart.findUnique({ where: { userId } });

//   if (existing) return NextResponse.json(existing);

//   const newCart = await prisma.cart.create({
//     data: { userId },
//   });

//   return NextResponse.json(newCart);
// }

// // Get cart with items
// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get("userId");

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//   }

//   const cart = await prisma.cart.findUnique({
//     where: { userId },
//     include: {
//       items: {
//         include: { product: true },
//       },
//     },
//   });

//   if (!cart) {
//     return NextResponse.json({ msg: "Cart not found" }, { status: 404 });
//   }

//   return NextResponse.json(cart);
// }

// // Add or update item
// export async function PUT(req: Request) {
//   const { cartId, productId, quantity } = await req.json();

//   if (!cartId || !productId || !quantity) {
//     console.log(
//       "from cart server: **  ",
//       "cart id: ",
//       cartId,
//       "product id: ",
//       productId,
//       "quantity: ",
//       quantity
//     );
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   const existing = await prisma.cartItem.findFirst({
//     where: { cartId, productId },
//   });

//   if (existing) {
//     const updated = await prisma.cartItem.update({
//       where: { id: existing.id },
//       data: { quantity: existing.quantity + quantity },
//     });
//     return NextResponse.json(updated);
//   }

//   const newItem = await prisma.cartItem.create({
//     data: { cartId, productId, quantity },
//   });

//   return NextResponse.json(newItem);
// }

// // Update quantity
// export async function PATCH(req: Request) {
//   const { itemId, quantity } = await req.json();

//   if (!itemId || quantity === undefined) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   const updated = await prisma.cartItem.update({
//     where: { id: itemId },
//     data: { quantity },
//   });

//   return NextResponse.json(updated);
// }

// // Delete item or full cart
// export async function DELETE(req: Request) {
//   const { itemId, userId } = await req.json();

//   if (itemId) {
//     await prisma.cartItem.delete({ where: { id: itemId } });
//     return NextResponse.json({ message: "Item removed" });
//   }

//   if (userId) {
//     await prisma.cart.delete({ where: { userId } });
//     return NextResponse.json({ message: "Cart deleted" });
//   }

//   return NextResponse.json(
//     { error: "Provide itemId or userId" },
//     { status: 400 }
//   );
// }
