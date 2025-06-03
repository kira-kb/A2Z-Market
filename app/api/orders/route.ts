import { PrismaClient } from "@/prisma/lib/generatedPrismaClient";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // const { userId } = await req.json();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Get user's cart with product prices
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or not found" },
        { status: 400 }
      );
    }

    // Calculate totalAmount
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    // Create the order and order items
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "pending",
        items: {
          create: cart.items.map((item) => ({
            // productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price, // price at purchase
            product: {
              connect: { id: item.product.id },
            },
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Delete cart items and cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    await prisma.cart.delete({ where: { id: cart.id } });

    return NextResponse.json({ message: "Order placed", order });
  } catch (err) {
    console.error("POST /orders error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ????????????????????????????????????????????????????????????
// ????????????????????????????????????????????????????????????

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

// PATCH: Admin - Update status, Recalculate total
export async function PATCH(req: Request) {
  const { orderId, status, recalculate } = await req.json();

  if (!orderId) {
    return NextResponse.json({ error: "orderId is required" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  let totalAmount = order.totalAmount;

  if (recalculate) {
    totalAmount = order.items.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      ...(status && { status }),
      ...(recalculate && { totalAmount }),
    },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return NextResponse.json(updated);
}

// DELETE: Either entire order or an item
export async function DELETE(req: Request) {
  const { orderId, itemId } = await req.json();

  if (itemId) {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: itemId },
      include: { order: true },
    });

    if (!orderItem || orderItem.order.status !== "pending") {
      return NextResponse.json(
        { error: "Item not found or order already processed" },
        { status: 400 }
      );
    }

    await prisma.orderItem.delete({ where: { id: itemId } });

    // Optional: Recalculate order total
    const remainingItems = await prisma.orderItem.findMany({
      where: { orderId: orderItem.orderId },
      include: { product: true },
    });

    const newTotal = remainingItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    await prisma.order.update({
      where: { id: orderItem.orderId },
      data: { totalAmount: newTotal },
    });

    return NextResponse.json({ message: "Item removed and order updated" });
  }

  if (orderId) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order || order.status !== "pending") {
      return NextResponse.json(
        { error: "Cannot delete order that is not pending" },
        { status: 400 }
      );
    }

    await prisma.orderItem.deleteMany({ where: { orderId } });
    await prisma.order.delete({ where: { id: orderId } });

    return NextResponse.json({ message: "Order deleted" });
  }

  return NextResponse.json(
    { error: "Missing itemId or orderId" },
    { status: 400 }
  );
}
