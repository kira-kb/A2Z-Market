import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
// import fileSystem from "fs";
import { join } from "path";
import TelegramBot, { InputMediaPhoto } from "node-telegram-bot-api";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string;
const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID as string;

const bot = new TelegramBot(telegramBotToken, { polling: false });

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
    // const CategoryId = data.get("categoryId") as string;

    // console.log(
    //   "incomming data: ",
    //   name,
    //   description,
    //   price,
    //   type,
    //   category,
    //   subCategory,
    //   brand,
    //   condition,
    //   tags
    // );

    //  TODO CHECKING CATEGORY
    const categories = await prisma.category.findUnique({
      where: { name: category },
    });

    // console.log("categories:  ", categories);

    if (!categories) {
      console.log("Category not found");
      return NextResponse.json({ msg: "Category not found" }, { status: 404 });
    }

    if (!name || !price || !category)
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );

    const buildCaption = (): string => {
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

    const uploadDir = join(
      "C:/Users/kirub/OneDrive/Desktop/code space/javascript/nextjs/Nextjs-projects/A2Z-Market-main/app/api/product",
      "public"
    );

    if (!telegramBotToken || !chatId) {
      return NextResponse.json(
        { msg: "Missing Telegram credentials" },
        { status: 500 }
      );
    }

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePaths: string[] = [];

    const preparedMedia: InputMediaPhoto[] = await Promise.all(
      files.map(async (file, index) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = join(uploadDir, file.name);

        // Save file locally
        await fs.writeFile(filePath, buffer);
        filePaths.push(filePath);

        return {
          type: "photo",
          media: filePath,
          caption: index === 0 ? buildCaption() : "",
          parse_mode: "HTML",
        } as InputMediaPhoto;
      })
    );

    // const bot = new TelegramBot(telegramBotToken, { polling: false });

    // Send multiple images to Telegram
    const mediaGroup = await bot.sendMediaGroup(chatId, preparedMedia);

    // TODO GETTING IMAGE PATH
    // const photoLinks = await Promise.all(
    //   mediaGroup.map(async (media) => {
    //     // if (!media) return;
    //     if (!media.photo) return;
    //     const fileId = media.photo[media.photo.length - 1].file_id;
    //     const file = await bot.getFile(fileId);
    //     return `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    //   })
    // );

    // TODO GETTING IMAGE ID

    const photoLinks = await Promise.all(
      mediaGroup.map(async (media) =>
        media.photo ? media.photo[media.photo.length - 1].file_id : null
      )
    );

    // TODO GETTING MESSAGE ID

    const tgMsgId = await Promise.all(mediaGroup.map((msg) => msg.message_id));

    // TODO SAVING PRODUCT WHITH IMAGES ID TO DATABASE

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

    const productPost = {
      name,
      description,
      price,
      categoryName: category,
      subCategory: subCategories,
      brands,
      type: types,
      conditions,
      image: photoLinks.filter((link): link is string => !!link),
    };

    console.log("product data: **  ", productPost);

    await prisma.product.create({
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

    // console.log("this are the pictures id:-  ", photoLinks.join("\n "));
    filePaths.forEach((path) => (path ? fs.rm(path) : null));

    return NextResponse.json(
      { msg: "Files uploaded and sent to Telegram", paths: filePaths },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

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
      filters.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        // { tags: { contains: search, mode: "insensitive" } },
      ];
    }

    if (subCategory?.length) {
      filters.subCategory = { in: subCategory };
    }

    if (type?.length) {
      filters.type = { in: type };
    }

    if (brand?.length) {
      filters.brands = { in: brand };
    }

    if (condition?.length) {
      filters.conditions = { in: condition };
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
    const files = data.getAll("file") as File[];
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const price = parseFloat(data.get("price") as string);
    const stock = parseInt(data.get("stock") as string);
    const image = data.get("image") as string;
    const categories = data.getAll("categories") as string[];
    const id = data.get("id") as string;

    // const body = await req.json();
    // const { id, name, description, price, stock, image, categories } = body;

    if (!files || files.length === 0) {
      // return NextResponse.json({ msg: "No files uploaded" }, { status: 400 });
      console.log("on images uploaded");
    }

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

// ???????????????????????????

// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs/promises";
// // import fs as fileSytyem from 'fs';
// import fileSystem from "fs";
// import { join } from "path";
// import telegram from "node-telegram-bot-api";

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.formData();
//     const files = data.getAll("file") as File[];

//     if (!files || files.length === 0) {
//       return NextResponse.json({ msg: "No files uploaded" }, { status: 400 });
//     }

//     const uploadDir = join(
//       "C:/Users/kirub/OneDrive/Desktop/code space/javascript/nextjs/Nextjs-projects/A2Z-Market-main/app/api/product",
//       "public"
//     );

//     const telegramBotToken = process.env
//       .NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string; // Replace with your Telegram bot token
//     // const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID as string; // Replace with your Telegram chat ID

//     // Ensure the directory exists
//     await fs.mkdir(uploadDir, { recursive: true });

//     const filePaths: string[] = [];

//     const preparedMedia = await Promise.all(
//       files.map(async (file, index) => {
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         // const filePath = join(uploadDir, file.name);

//         // await fs.writeFile(filePath, buffer);
//         // console.log(`Saved file: ${filePath}`);

//         // filePaths.push(filePath);

//         return {
//           type: "photo",
//           media: fileSystem.createReadStream(buffer),
//           caption: index === 0 ? "caption" : "",
//           parse_mode: "HTML",
//         };
//       })
//     );

//     const bot = new telegram(telegramBotToken, { polling: false });

//     await bot.sendMediaGroup(telegramBotToken, preparedMedia);

//     return NextResponse.json(
//       { msg: "Files uploaded", paths: filePaths },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error uploading files:", error);
//     return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
//   }
// }

// ?????????????????????????????????????

// import { NextRequest, NextResponse } from "next/server";
// // import { IncomingForm, File } from "formidable";
// import fs from "fs";
// import { join } from "path";

// // POST handler for file uploads
// export async function POST(req: NextRequest) {
//   const data = req.formData();

//   const file: File[] = (await data).getAll("file") as unknown as File[];

//   if (!file)
//     return NextResponse.json({ msg: "No file uploaded" }, { status: 400 });

//   let dir = "";

//   await file.forEach(async (pic) => {
//     const bytes = await pic.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const path = join(
//       "C:/Users/kirub/OneDrive/Desktop/code space/javascript/nextjs/Nextjs-projects/A2Z-Market-main/app/api/product",
//       "public",
//       pic.name
//     );
//     await fs.writeFile(path, buffer, (err) => {
//       if (err) throw err;
//       console.log("The file has been saved!");
//     });

//     dir = `${dir}, ${path}`;
//   });

//   // const bytes = await file.arrayBuffer();
//   // const buffer = Buffer.from(bytes);

//   // const path = join(
//   //   "C:/Users/kirub/OneDrive/Desktop/code space/javascript/nextjs/Nextjs-projects/A2Z-Market-main/app/api/product",
//   //   "public",
//   //   file.name
//   // );
//   // await fs.writeFile(path, buffer, (err) => {
//   //   if (err) throw err;
//   //   console.log("The file has been saved!");
//   // });

//   // console.log(`open :-  ${path}`);

//   console.log(`open :-  ${dir}`);

//   return NextResponse.json({ msg: "File uploaded" }, { status: 200 });
// }

// ????????????????????????????????????????????
// ????????????????????????????????????????????

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// CREATE a product (POST)
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, description, price, stock, image, categories } = body;

//     const newProduct = await prisma.product.create({
//       data: {
//         name,
//         description,
//         price,
//         stock,
//         image,
//         categories: {
//           connect: categories.map((id: string) => ({ id })),
//         },
//       },
//     });

//     return NextResponse.json(newProduct, { status: 201 });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     return NextResponse.json(
//       { error: "Failed to create product" },
//       { status: 500 }
//     );
//   }
// }

// // ?????????????????????????????????????
// // ?????????????????????????????????????
// // import { NextResponse } from "next/server";
// import TelegramBot, { InputMediaPhoto } from "node-telegram-bot-api";

// interface Product {
//   name: string;
//   category: string;
//   subCategory: string;
//   brand: string;
//   type: string;
//   condition: string;
//   description: string;
//   tags: string;
//   price: number;
// }

// const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string; // Replace with your Telegram bot token
// const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID as string; // Replace with your Telegram chat ID

// // Initialize the Telegram bot
// const bot = new TelegramBot(telegramBotToken, { polling: false });

// // Mock function to simulate saving product data to the database
// const saveProductToDatabase = async (product: {
//   name: string;
//   description: string;
//   price: number;
//   type: string;
//   tags: string;
//   category: string;
//   subCategory: string;
//   brand: string;
//   condition: string;
//   images: string[];
// }) => {
//   console.log("Saving product to database:", product);
//   return product;
// };

// const buildCaption = ({
//   name,
//   category,
//   subCategory = "",
//   brand = "",
//   type = "",
//   condition = "",
//   description,
//   tags = "",
//   price = 0,
// }: Product): string => {
//   return `
// <b>📦 PRODUCT NAME:</b> ${name}
// <b>🚩 CATEGORY:</b> ${category}
// ${subCategory ? `<b>🎟️ SUB-CATEGORY: </b>${subCategory}` : ""}

// ${brand ? `<b>🅱️ BRAND:</b> ${brand}` : ""}
// ${type ? `<b>🏷️ TYPE:</b> ${type}` : ""}
// ${condition ? `<b>☁️ CONDITION:</b> ${condition}` : ""}

// <b>📝 DESCRIPTION:</b>
// 🔹 ${description}
// ${tags ? `<b>🏷️ TAGS:</b> ${tags}` : ""}
// <b>📞 CONTACT US:</b> 0918443274
// <b>💰 PRICE:</b> ${price} Birr`;
// };

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

// TODO ????????????????????//

//     // Extract text fields
//     const name = formData.get("name") as string;
//     const description = formData.get("description") as string;
//     const price = parseFloat(formData.get("price") as string);
//     const type = formData.get("type") as string;
//     const category = formData.get("category") as string;
//     const subCategory = formData.get("subCategory") as string;
//     const brand = formData.get("brand") as string;
//     const condition = formData.get("condition") as string;
//     const tags = formData.get("tags") as string;

//     // Extract image files
//     const imageFiles = formData.getAll("images") as File[];

//     // Prepare captions
//     const caption = buildCaption({
//       name,
//       description,
//       price,
//       type,
//       tags,
//       category,
//       subCategory,
//       brand,
//       condition,
//     });

//     // Convert images to buffers and prepare media objects
//     // const preparedMedia = await Promise.all(
//     //   imageFiles.map(async (img, i) => {
//     //     const buffer = Buffer.from(await img.arrayBuffer());
//     //     return {
//     //       type: "photo",
//     //       media: buffer,
//     //       caption: i === 0 ? caption : "", // Caption only for the first image
//     //       parse_mode: "HTML",
//     //     };
//     //   })
//     // );

//     // Function to upload individual photos to Telegram and return their file IDs
//     const uploadImageAndGetFileId = async (
//       buffer: Buffer,
//       caption: string
//     ): Promise<string> => {
//       try {
//         const message = await bot.sendPhoto(chatId, buffer, {
//           caption,
//           parse_mode: "HTML",
//         });
//         const fileId = message.photo?.[message.photo.length - 1].file_id;
//         if (!fileId) throw new Error("Failed to get file ID from Telegram");
//         return fileId;
//       } catch (error) {
//         console.error("Error uploading image to Telegram:", error);
//         throw error;
//       }
//     };

//     // Inside your POST function
//     const preparedMedia: InputMediaPhoto[] = await Promise.all(
//       imageFiles.map(async (img, i) => {
//         const buffer = Buffer.from(await img.arrayBuffer());

//         // Upload image and get file_id
//         const fileId = await uploadImageAndGetFileId(
//           buffer,
//           i === 0 ? caption : ""
//         );

//         return {
//           type: "photo",
//           media: fileId, // Use file_id here instead of Buffer
//           caption: i === 0 ? caption : "", // Caption only for the first image
//           parse_mode: "HTML",
//         };
//       })
//     );

//     // Send images as a media group
//     const message = await bot.sendMediaGroup(chatId, preparedMedia);

//     // Get file URLs from Telegram
//     const imageUrls = await Promise.all(
//       message.map(async (msg) => {
//         if (!msg.photo) return null;
//         const fileId = msg.photo.at(-1)?.file_id;
//         if (!fileId) return null;
//         const fileInfo = await bot.getFile(fileId);
//         return `https://api.telegram.org/file/bot${telegramBotToken}/${fileInfo.file_path}`;
//       })
//     );

//     // Remove null values
//     const validImageUrls = imageUrls.filter((url) => url !== null) as string[];

//     console.log("Incoming Data:", {
//       name,
//       description,
//       price,
//       type,
//       tags,
//       category,
//       subCategory,
//       brand,
//       condition,
//     });

//     // Construct product object
//     const product = {
//       name,
//       description,
//       price,
//       type,
//       category,
//       subCategory,
//       brand,
//       tags,
//       condition,
//       images: validImageUrls,
//     };

//     // Save product to database
//     const savedProduct = await saveProductToDatabase(product);

//     return new Response(
//       JSON.stringify({
//         message: "Product added successfully",
//         product: savedProduct,
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return new Response(JSON.stringify({ error: "Error adding product" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// // ?????????????????????????????????????
// // ?????????????????????????????????????
// // // api/products.js (Next.js API Route)
// // import { NextApiRequest, NextApiResponse } from "next";
// // import multer from "multer"; // For handling file uploads
// // // import fs from 'fs'; // To work with files if you want to save locally
// // // import path from 'path';
// // import axios from "axios";

// // // Multer setup (using memory storage for simplicity)
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage: storage }).array("images"); // 'images' is the key name from FormData

// // // Telegram bot configuration
// // const telegramBotToken = "YOUR_BOT_TOKEN"; // Replace with your Telegram bot token
// // const chatId = "YOUR_CHAT_ID"; // Replace with your Telegram chat ID

// // // Mock function to simulate saving product data to the database
// // const saveProductToDatabase = async (product) => {
// //   // Simulate saving product to a database (e.g., MongoDB, MySQL)
// //   console.log("Saving product to database:", product);
// //   return product; // Return the saved product (with image URLs)
// // };

// // // Function to upload image to Telegram and get the URL
// // const uploadImageToTelegram = async (imageBuffer, imageName) => {
// //   try {
// //     // Make a POST request to send the image to Telegram
// //     const formData = new FormData();
// //     formData.append("chat_id", chatId);
// //     formData.append(
// //       "photo",
// //       new Blob([imageBuffer], { type: "image/jpeg" }),
// //       imageName
// //     );

// //     const response = await axios.post(
// //       `https://api.telegram.org/bot${telegramBotToken}/sendPhoto`,
// //       formData,
// //       {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       }
// //     );

// //     // Extract the file ID from the response and generate the URL
// //     const fileId =
// //       response.data.result.photo[response.data.result.photo.length - 1].file_id;
// //     const fileUrlResponse = await axios.get(
// //       `https://api.telegram.org/bot${telegramBotToken}/getFile?file_id=${fileId}`
// //     );
// //     const filePath = fileUrlResponse.data.result.file_path;

// //     // Generate the URL to access the file from Telegram
// //     const imageUrl = `https://api.telegram.org/file/bot${telegramBotToken}/${filePath}`;
// //     return imageUrl;
// //   } catch (error) {
// //     console.error("Error uploading image to Telegram:", error);
// //     throw new Error("Failed to upload image to Telegram");
// //   }
// // };

// // // API handler for POST requests (uploading products)
// // export default function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method === "POST") {
// //     // Handle file upload using multer
// //     upload(req, res, async (err) => {
// //       if (err) {
// //         return res.status(500).json({ error: "Error uploading files" });
// //       }

// //       const {
// //         name,
// //         description,
// //         price,
// //         stock,
// //         category,
// //         subCategory,
// //         brand,
// //         condition,
// //       } = req.body;

// //       // Assuming files are uploaded as 'images' and you have them in req.files
// //       const images = req.files.map((file) => {
// //         return uploadImageToTelegram(file.buffer, file.originalname);
// //       });

// //       try {
// //         // Wait for all images to be uploaded to Telegram and get the URLs
// //         const imageUrls = await Promise.all(images);

// //         const product = {
// //           name,
// //           description,
// //           price,
// //           stock,
// //           category,
// //           subCategory,
// //           brand,
// //           condition,
// //           images: imageUrls, // Array of image URLs from Telegram
// //         };

// //         // Save the product details and image URLs in the database
// //         const savedProduct = await saveProductToDatabase(product);

// //         // Respond with success
// //         res
// //           .status(200)
// //           .json({
// //             message: "Product added successfully",
// //             product: savedProduct,
// //           });
// //       } catch (error) {
// //         console.error("Error adding product:", error);
// //         res.status(500).json({ error: "Error adding product" });
// //       }
// //     });
// //   } else {
// //     // Method Not Allowed for other HTTP methods
// //     res.status(405).json({ error: "Method Not Allowed" });
// //   }
// // }

// // GET all products (GET)
// export async function GET() {
//   console.log("categories get method 👋");
//   try {
//     const products = await prisma.product.findMany({
//       include: {
//         categories: true,
//       },
//     });

//     // console.log("products:  ", products);

//     return NextResponse.json(products, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }

// // UPDATE a product (PUT)
// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();
//     const { id, name, description, price, stock, image, categories } = body;

//     const updatedProduct = await prisma.product.update({
//       where: { id },
//       data: {
//         name,
//         description,
//         price,
//         stock,
//         image,
//         categories: {
//           set: categories.map((id: string) => ({ id })), // Reset categories
//         },
//       },
//     });

//     return NextResponse.json(updatedProduct, { status: 200 });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return NextResponse.json(
//       { error: "Failed to update product" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE a product (DELETE)
// export async function DELETE(req: Request) {
//   try {
//     const { id } = await req.json();

//     const deletedProduct = await prisma.product.delete({
//       where: { id },
//     });

//     return NextResponse.json(deletedProduct, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json(
//       { error: "Failed to delete product" },
//       { status: 500 }
//     );
//   }
// }
