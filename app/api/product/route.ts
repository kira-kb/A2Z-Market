import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// CREATE a product (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, stock, image, categories } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        image,
        categories: {
          connect: categories.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// GET all products (GET)
export async function GET() {
  console.log("categories get method 👋");
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
      },
    });

    // console.log("products:  ", products);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// UPDATE a product (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, price, stock, image, categories } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        image,
        categories: {
          set: categories.map((id: string) => ({ id })), // Reset categories
        },
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE a product (DELETE)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
