import { NextRequest, NextResponse } from "next/server";
// import fs from "fs/promises";
// import path, { join } from "path";
import TelegramBot, { InputMediaPhoto } from "node-telegram-bot-api";
import prisma from "@/lib/prisma";
// import { Prisma } from "@prisma/client";
import { Prisma } from "@/prisma/lib/generatedPrismaClient";
import { sendEmailToSubscribers } from "@/lib/sendEmailToSubscribers";
import { Readable } from "stream";

const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string;
const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID as string;

const bot = new TelegramBot(telegramBotToken, { polling: false });

// TODO BUILDING CAPTION

const buildCaption = ({
  name,
  category,
  subCategory,
  brand,
  type,
  condition,
  description,
  tags,
  price,
}: {
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  type: string;
  condition: string;
  description: string;
  tags: string;
  price: number;
}): string => {
  return `
<b>📦 PRODUCT NAME:</b> ${name}
<b>🚩 CATEGORY:</b> ${category}${
    subCategory ? `\n<b>🎟️ SUB-CATEGORY: </b>${subCategory}` : ""
  }${brand ? `\n<b>🅱️ BRAND:</b> ${brand}` : ""}${
    type ? `\n<b>🏷️ TYPE:</b> ${type}` : ""
  }${condition ? `\n<b>☁️ CONDITION:</b> ${condition}` : ""}

<b>📝 DESCRIPTION:</b>
🔹 ${description}
${tags ? `<b>🏷️ TAGS:</b> ${tags}` : ""}
<b>📞 CONTACT US:</b> 0918443274
<b>💰 PRICE:</b> ${price} Birr`;
};

// import { NextRequest, NextResponse } from "next/server";
// import { Readable } from "stream";
// import TelegramBot, { InputMediaPhoto } from "node-telegram-bot-api";
// import prisma from "@/lib/prisma"; // adjust this path based on your project
// import { buildCaption } from "@/lib/caption-builder"; // assume you have a separate util for caption
// import { sendEmailToSubscribers } from "@/lib/email"; // assume you use this

// const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN!;
// const chatId = process.env.TELEGRAM_CHAT_ID!;
// const bot = new TelegramBot(telegramBotToken, { polling: false });

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const files = data.getAll("file") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ msg: "No files uploaded" }, { status: 400 });
    }

    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const price = parseFloat(data.get("price") as string);
    const type = data.get("type") as string;
    const category = data.get("category") as string;
    const subCategory = data.get("subCategory") as string;
    const brand = data.get("brand") as string;
    const condition = data.get("condition") as string;
    const tags = data.get("tags") as string;

    if (!name || !price || !category)
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );

    const categories = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!categories) {
      return NextResponse.json({ msg: "Category not found" }, { status: 404 });
    }

    const caption = buildCaption({
      name,
      category,
      subCategory,
      brand,
      type,
      condition,
      description,
      tags,
      price,
    });

    // // Create InputMediaPhoto[] using streams instead of file paths
    // const preparedMedia: InputMediaPhoto[] = await Promise.all(
    //   files.map(async (file, index) => {
    //     const bytes = await file.arrayBuffer();
    //     const buffer = Buffer.from(bytes);
    //     const stream = Readable.from(buffer);
    //     (stream as any).path = file.name; // required by Telegram to recognize the file type

    //     return {
    //       type: "photo",
    //       media: stream,
    //       caption: index === 0 ? caption : "",
    //       parse_mode: "HTML",
    //     };
    //   })
    // );
    const preparedMedia: InputMediaPhoto[] = await Promise.all(
      files.map(async (file, index) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const stream = Readable.from(buffer);
        (stream as any).path = file.name; // Needed by Telegram API

        const photo = {
          type: "photo",
          media: stream,
          caption: index === 0 ? caption : "",
          parse_mode: "HTML",
        };

        return photo as unknown as InputMediaPhoto;
      })
    );

    const mediaGroup = await bot.sendMediaGroup(chatId, preparedMedia);

    const photoLinks = await Promise.all(
      mediaGroup.map(async (media) =>
        media.photo ? media.photo[media.photo.length - 1].file_id : null
      )
    );

    const tgMsgId = mediaGroup.map((msg) => msg.message_id);

    const subCategories = categories.subCategory
      ?.split(", ")
      .map((sub) => sub.trim())
      .includes(subCategory)
      ? subCategory
      : undefined;
    const brands = categories.brands
      ?.split(", ")
      .map((brand) => brand.trim())
      .includes(brand)
      ? brand
      : undefined;
    const conditions = categories.conditions
      ?.split(", ")
      .map((cond) => cond.trim())
      .includes(condition)
      ? condition
      : undefined;
    const types = categories.type
      ?.split(", ")
      .map((t) => t.trim())
      .includes(type)
      ? type
      : undefined;

    const uploadedProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categories: {
          connect: { name: category },
        },
        subCategory: subCategories,
        brands,
        type: types,
        conditions,
        tgMsgId,
        image: photoLinks.filter((link): link is string => !!link),
      },
    });

    NextResponse.json(
      { msg: "Product uploaded and sent to Telegram successfully" },
      { status: 200 }
    );

    // Notify subscribers
    await sendEmailToSubscribers(uploadedProduct);

    return NextResponse.json(
      { msg: "Product uploaded and sent to Telegram successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

// TODO THE FIRST POST WORKS USING FILE SYSTEM

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.formData();
//     const files = data.getAll("file") as File[];

//     if (!files || files.length === 0) {
//       return NextResponse.json({ msg: "No files uploaded" }, { status: 400 });
//     }

//     const name = data.get("name") as string;
//     const description = data.get("description") as string;
//     const price = parseFloat(data.get("price") as string);
//     const type = data.get("type") as string;
//     const category = data.get("category") as string;
//     const subCategory = data.get("subCategory") as string;
//     const brand = data.get("brand") as string;
//     const condition = data.get("condition") as string;
//     const tags = data.get("tags") as string;
//     // const CategoryId = data.get("categoryId") as string;

//     // console.log(
//     //   "incomming data: ",
//     //   name,
//     //   description,
//     //   price,
//     //   type,
//     //   category,
//     //   subCategory,
//     //   brand,
//     //   condition,
//     //   tags
//     // );

//     //  TODO CHECKING CATEGORY
//     const categories = await prisma.category.findUnique({
//       where: { name: category },
//     });

//     // console.log("categories:  ", categories);

//     if (!categories) {
//       console.log("Category not found");
//       return NextResponse.json({ msg: "Category not found" }, { status: 404 });
//     }

//     if (!name || !price || !category)
//       return NextResponse.json(
//         { msg: "Missing required fields" },
//         { status: 400 }
//       );

//     //     const buildCaption = (): string => {
//     //       return `
//     // <b>📦 PRODUCT NAME:</b> ${name}
//     // <b>🚩 CATEGORY:</b> ${category}${
//     //         subCategory ? `\n<b>🎟️ SUB-CATEGORY: </b>${subCategory}` : ""
//     //       }${brand ? `\n<b>🅱️ BRAND:</b> ${brand}` : ""}${
//     //         type ? `\n<b>🏷️ TYPE:</b> ${type}` : ""
//     //       }${condition ? `\n<b>☁️ CONDITION:</b> ${condition}` : ""}

//     // <b>📝 DESCRIPTION:</b>
//     // 🔹 ${description}
//     // ${tags ? `<b>🏷️ TAGS:</b> ${tags}` : ""}
//     // <b>📞 CONTACT US:</b> 0918443274
//     // <b>💰 PRICE:</b> ${price} Birr`;
//     //     };

//     const caption = buildCaption({
//       name,
//       category,
//       subCategory,
//       brand,
//       type,
//       condition,
//       description,
//       tags,
//       price,
//     });

//     // const uploadDir = join(
//     //   "C:/Users/kirub/OneDrive/Desktop/code space/javascript/nextjs/Nextjs-projects/A2Z-Market-main/app/api/product",
//     //   "public"
//     // );

//     const uploadDir = path.join(process.cwd(), "app/api/product/public");

//     if (!telegramBotToken || !chatId) {
//       return NextResponse.json(
//         { msg: "Missing Telegram credentials" },
//         { status: 500 }
//       );
//     }

//     // Ensure the directory exists
//     await fs.mkdir(uploadDir, { recursive: true });

//     const filePaths: string[] = [];

//     const preparedMedia: InputMediaPhoto[] = await Promise.all(
//       files.map(async (file, index) => {
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         const filePath = join(uploadDir, file.name);

//         // Save file locally
//         await fs.writeFile(filePath, buffer);
//         filePaths.push(filePath);

//         return {
//           type: "photo",
//           media: filePath,
//           caption: index === 0 ? caption : "",
//           parse_mode: "HTML",
//         } as InputMediaPhoto;
//       })
//     );

//     // const bot = new TelegramBot(telegramBotToken, { polling: false });

//     // Send multiple images to Telegram
//     const mediaGroup = await bot.sendMediaGroup(chatId, preparedMedia);

//     // TODO GETTING IMAGE PATH
//     // const photoLinks = await Promise.all(
//     //   mediaGroup.map(async (media) => {
//     //     // if (!media) return;
//     //     if (!media.photo) return;
//     //     const fileId = media.photo[media.photo.length - 1].file_id;
//     //     const file = await bot.getFile(fileId);
//     //     return `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
//     //   })
//     // );

//     // TODO GETTING IMAGE ID

//     const photoLinks = await Promise.all(
//       mediaGroup.map(async (media) =>
//         media.photo ? media.photo[media.photo.length - 1].file_id : null
//       )
//     );

//     // TODO GETTING MESSAGE ID

//     const tgMsgId = await Promise.all(mediaGroup.map((msg) => msg.message_id));

//     // TODO SAVING PRODUCT WHITH IMAGES ID TO DATABASE

//     const subCategories = categories.subCategory
//       ?.split(", ")
//       .map((sub) => sub.trim())
//       .includes(subCategory)
//       ? subCategory
//       : undefined;
//     const brands = categories.brands
//       ?.split(", ")
//       .map((brand) => brand.trim())
//       .includes(brand)
//       ? brand
//       : undefined;
//     const conditions = categories.conditions
//       ?.split(", ")
//       .map((cond) => cond.trim())
//       .includes(condition)
//       ? condition
//       : undefined;
//     const types = categories.type
//       ?.split(", ")
//       .map((t) => t.trim())
//       .includes(type)
//       ? type
//       : undefined;

//     // const productPost = {
//     //   name,
//     //   description,
//     //   price,
//     //   categoryName: category,
//     //   subCategory: subCategories,
//     //   brands,
//     //   type: types,
//     //   conditions,
//     //   image: photoLinks.filter((link): link is string => !!link),
//     // };

//     // console.log("product data: **  ", productPost);

//     const uploadedProduct = await prisma.product.create({
//       data: {
//         name,
//         description,
//         price,
//         categories: {
//           connect: { name: category },
//         },
//         subCategory: subCategories,
//         brands,
//         type: types,
//         conditions,
//         tgMsgId,
//         image: photoLinks.filter((link): link is string => !!link),
//       },
//     });

//     // console.log("this are the pictures id:-  ", photoLinks.join("\n "));
//     filePaths.forEach((path) => (path ? fs.rm(path) : null));

//     NextResponse.json(
//       { msg: "Files uploaded and sent to Telegram", paths: filePaths },
//       { status: 200 }
//     );

//     // const forwardedProto = req.headers.get("x-forwarded-proto");
//     // const host = req.headers.get("host");
//     // // const protocol = forwardedProto || "http"; // fallback to "http" if not available

//     // const theUrl = `https://${host}`;

//     // console.log("host: ", theUrl);

//     sendEmailToSubscribers(uploadedProduct);

//     return NextResponse.json(
//       { msg: "Files uploaded and sent to Telegram", paths: filePaths },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error uploading files:", error);
//     return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
//   }
// }

// TODO GETTING PRODUCT

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const productId = searchParams.get("id");
    if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { categories: true },
      });

      if (!product) {
        return NextResponse.json({ msg: "Product not found" }, { status: 404 });
      }

      return NextResponse.json(product, { status: 200 });
    }

    const search = searchParams.get("search");
    const category = searchParams
      .get("category")
      ?.split(",")
      .map((s) => s.trim());

    const subCategory = searchParams
      .get("subCategory")
      ?.split(",")
      .map((s) => s.trim());
    const type = searchParams
      .get("type")
      ?.split(",")
      .map((s) => s.trim());
    const brand = searchParams
      .get("brand")
      ?.split(",")
      .map((s) => s.trim());
    const condition = searchParams
      .get("condition")
      ?.split(",")
      .map((s) => s.trim());
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // const sortBy = searchParams.get("sortBy") || "createdAt";
    // const sortOrder = searchParams.get("sortOrder") || "desc";
    const sort: Prisma.ProductOrderByWithRelationInput = {
      createdAt: searchParams.get("sortOrder") === "asc" ? "asc" : "desc",
    };
    // const sort: Prisma.ProductOrderByWithRelationInput = {" ? "desc" : "asc"};

    const filters: Prisma.ProductWhereInput = {};

    if (search) {
      // filters.OR = [
      filters.AND = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        // { tags: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category?.length) {
      filters.categories = {
        some: { name: { in: category, mode: "insensitive" } },
      };
    }

    if (subCategory?.length) {
      filters.subCategory = { in: subCategory, mode: "insensitive" };
    }

    if (type?.length) {
      filters.type = { in: type, mode: "insensitive" };
    }

    if (brand?.length) {
      filters.brands = { in: brand, mode: "insensitive" };
    }

    if (condition?.length) {
      filters.conditions = { in: condition, mode: "insensitive" };
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.gte = parseFloat(minPrice);
      if (maxPrice) filters.price.lte = parseFloat(maxPrice);
    }

    const products = await prisma.product.findMany({
      where: filters,
      orderBy: sort,
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET /api/product error:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

// TODO UPDATE a product (PUT)
export async function PUT(req: Request) {
  try {
    const data = await req.formData();

    const id = data.get("id") as string;
    // const files = data.getAll("file") as File[];
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const price = parseFloat(data.get("price") as string);
    // const stock = parseInt(data.get("stock") as string);
    const image = data.get("image") as string;
    // const category = data.getAll("categories") as string[];
    const type = data.get("type") as string;
    const category = data.get("category") as string;
    const subCategory = data.get("subCategory") as string;
    const brand = data.get("brand") as string;
    const condition = data.get("condition") as string;
    // const tags = data.get("tags") as string;

    // const categories = await prisma.category.findUnique({
    //   where: { name: category },
    // });

    const product = await prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    });

    const categories = product?.categories[0];

    console.log(product);

    if (!categories) {
      return NextResponse.json({ msg: "Category not found" }, { status: 404 });
    }

    const subCategories = categories.subCategory
      ?.split(", ")
      .map((sub) => sub.trim())
      .includes(subCategory)
      ? subCategory
      : undefined;
    const brands = categories.brands
      ?.split(", ")
      .map((brand) => brand.trim())
      .includes(brand)
      ? brand
      : undefined;
    const conditions = categories.conditions
      ?.split(", ")
      .map((cond) => cond.trim())
      .includes(condition)
      ? condition
      : undefined;
    const types = categories.type
      ?.split(", ")
      .map((t) => t.trim())
      .includes(type)
      ? type
      : undefined;

    const imgs = image.split(", ");

    // if (!files || files.length === 0) {
    //   // return NextResponse.json({ msg: "No files uploaded" }, { status: 400 });
    //   console.log("on images uploaded");
    // }

    // if (((!imgs || imgs.length === 0) && !files) || files.length === 0) {
    if (!imgs || imgs.length === 0) {
      return NextResponse.json(
        { msg: "a product should have atleast one image" },
        { status: 400 }
      );
    }

    // const uploadDir = join(
    //   "C:/Users/kirub/OneDrive/Desktop/code space/javascript/nextjs/Nextjs-projects/A2Z-Market-main/app/api/product",
    //   "public"
    // );

    // if (!telegramBotToken || !chatId) {
    //   return NextResponse.json(
    //     { msg: "Missing Telegram credentials" },
    //     { status: 500 }
    //   );
    // }

    // Ensure the directory exists
    // await fs.mkdir(uploadDir, { recursive: true });

    // const filePaths: string[] = [];

    // await Promise.all(
    //   files.map(async (file) => {
    //     const bytes = await file.arrayBuffer();
    //     const buffer = Buffer.from(bytes);
    //     const filePath = join(uploadDir, file.name);

    //     // Save file locally
    //     await fs.writeFile(filePath, buffer);
    //     filePaths.push(filePath);

    //     // const newImageUrl = {
    //     //   type: "photo",
    //     //   media: filePath,
    //     //   // caption: index === 0 ? buildCaption() : "",
    //     //   parse_mode: "HTML",
    //     // } as InputMediaPhoto;

    //     await bot.editMessageMedia(
    //       {
    //         type: "photo",
    //         media: filePath,
    //         caption: "Updated image 3 (optional)", // Optional per-image caption
    //       },
    //       {
    //         chat_id: chatId,
    //         message_id: 319, // third image
    //       }
    //     );
    //   })
    // );

    // TODO UPDATE TELEGRAM
    // bot.editMessageMedia(preparedMedia, {
    //   chat_id: chatId,
    //   message_id: 319,
    // });

    const tags = "";

    const caption = buildCaption({
      name,
      category,
      subCategory,
      brand,
      type,
      condition,
      description,
      tags,
      price,
    });

    bot.editMessageCaption(caption, {
      chat_id: chatId,
      message_id: product.tgMsgId[0],
      parse_mode: "HTML",
    });

    // TODO UPDATE THE DATABASE
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: price,
        image: imgs,
        type: types,
        subCategory: subCategories,
        brands: brands,
        conditions: conditions,

        // Update category relationships
        categories: {
          set: { name: categories?.name },
        },
      },
      include: {
        categories: {
          select: { name: true },
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

// TODO DELETE a product (DELETE)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const productId = searchParams.get("id");
    const deleteOnTelegram = searchParams.get("deleteOnTelegram");

    if (!productId) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );
    }

    if (deleteOnTelegram === "true") {
      const messageId = await prisma.product.findUnique({
        where: { id: productId },
        select: { tgMsgId: true },
      });

      if (!messageId) return;

      for (const id of messageId.tgMsgId) {
        try {
          await bot.deleteMessage(chatId, id);
        } catch (err) {
          console.error(`Failed to delete ${id}`, err);
        }
      }

      // await bot.deleteMessage(chatId, messageId.tgMsgId);
    }

    // const deletedProduct = await prisma.product.delete({
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json("Product Deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
