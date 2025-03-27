import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure you have the Prisma client properly set up in lib/prisma.ts

// Handle GET request to fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}

// Handle POST request to add a new category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, subCategories, brands, conditions, image } = body;

    // console.log("from api: **  ", name, type, subCategories, brands);

    const newCategory = await prisma.category.create({
      data: {
        name: name,
        type,
        subCategory: subCategories,
        brands,
        conditions,
        image,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    );
  }
}

// Handle PUT request to update an existing category
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, type, subCategories, brands, conditions, image } = body;

    console.log(
      "from api: **  ",
      name,
      "type: ",
      type,
      "subCategories: ",
      subCategories,
      "brands: ",
      brands,
      "conditions: ",
      conditions,
      "image: ",
      image
    );

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        type,
        subCategory: subCategories,
        brands,
        conditions,
        image,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    );
  }
}

// Handle DELETE request to remove a category
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    );
  }
}
