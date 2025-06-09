import { NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import fs from "fs/promises";
import { existsSync, createReadStream } from "fs";
import { join } from "path";
import prisma from "@/lib/prisma";

let botToken: string | undefined = process.env.TELEGRAM_BOT_TOKEN;

const checkToken = async () => {
  if (!botToken)
    botToken = await prisma.tokens
      .findUnique({
        where: { email: "kirubelbewket@gmail.com" },
        select: { botToken: true },
      })
      .then((token) => token?.botToken);
};

checkToken();

const cacheDir = join(process.cwd(), "public", "telegram-cache");
const fallbackImagePath = join(process.cwd(), "public", "favicon.png");

export async function GET(req: NextRequest) {
  const fileId = new URL(req.url).searchParams.get("fileId");
  if (!fileId)
    return NextResponse.json({ msg: "Missing fileId" }, { status: 400 });

  if (!botToken)
    return NextResponse.json({ msg: "Missing bot token" }, { status: 400 });

  const localPath = join(cacheDir, `${fileId}.jpg`);

  try {
    // 1. Return from cache if available
    if (existsSync(localPath)) {
      const stream = createReadStream(localPath);
      return new NextResponse(stream as unknown as ReadableStream<Uint8Array>, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=302400",
        },
      });
    }

    // 2. Try to fetch from Telegram once, with a retry fallback
    const tryFetchImage = async (): Promise<Buffer> => {
      const bot = new TelegramBot(botToken!, { polling: false });
      const file = await bot.getFile(fileId);
      const telegramUrl = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`;
      const response = await fetch(telegramUrl);
      if (!response.ok) throw new Error("Telegram fetch failed");
      return Buffer.from(await response.arrayBuffer());
    };

    let imageBuffer: Buffer;
    try {
      imageBuffer = await tryFetchImage();
    } catch (err) {
      console.error("Telegram image fetch error:", err);
      console.warn("First Telegram fetch failed, retrying once...");
      imageBuffer = await tryFetchImage(); // Retry once
    }

    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(localPath, imageBuffer);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=302400",
      },
    });
  } catch (err) {
    console.error("Telegram image final error:", err);

    // 3. Fallback image
    const fallbackBuffer = await fs.readFile(fallbackImagePath);
    return new NextResponse(fallbackBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache",
      },
    });
  }
}

// ????????????????????????????????????????????????????????????????????
// ????????????????????????????????????????????????????????????????????

// import { NextRequest, NextResponse } from "next/server";
// import TelegramBot from "node-telegram-bot-api";
// import fs from "fs/promises";
// import { existsSync, createReadStream } from "fs";
// import { join } from "path";
// import prisma from "@/lib/prisma";

// let botToken: string | undefined = process.env.TELEGRAM_BOT_TOKEN;

// const checkToken = async () => {
//   if (!botToken)
//     botToken = await prisma.tokens
//       .findUnique({
//         where: { email: "kirubelbewket@gmail.com" },
//         select: { botToken: true },
//       })
//       .then((token) => token?.botToken);
// };

// checkToken();

// const cacheDir = join(process.cwd(), "public", "telegram-cache");
// const fallbackImagePath = join(process.cwd(), "public", "favicon.png");

// export async function GET(req: NextRequest) {
//   const fileId = new URL(req.url).searchParams.get("fileId");
//   if (!fileId)
//     return NextResponse.json({ msg: "Missing fileId" }, { status: 400 });

//   if (!botToken)
//     return NextResponse.json({ msg: "Missing bot token" }, { status: 400 });

//   const localPath = join(cacheDir, `${fileId}.jpg`);

//   try {
//     // Serve from local cache if exists
//     if (existsSync(localPath)) {
//       const stream = createReadStream(localPath);
//       return new NextResponse(stream as unknown as ReadableStream<Uint8Array>, {
//         status: 200,
//         headers: {
//           "Content-Type": "image/jpeg",
//           "Cache-Control": "public, max-age=302400",
//         },
//       });
//     }

//     // Otherwise, fetch from Telegram
//     const bot = new TelegramBot(botToken, { polling: false });
//     const file = await bot.getFile(fileId);
//     const telegramUrl = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`;

//     const response = await fetch(telegramUrl);
//     if (!response.ok) throw new Error("Failed to fetch Telegram image");

//     const buffer = Buffer.from(await response.arrayBuffer());

//     // Ensure cache dir exists
//     await fs.mkdir(cacheDir, { recursive: true });

//     // Save locally
//     await fs.writeFile(localPath, buffer);

//     return new NextResponse(buffer, {
//       status: 200,
//       headers: {
//         "Content-Type": response.headers.get("content-type") || "image/jpeg",
//         "Cache-Control": "public, max-age=302400",
//         // "Cache-Control": "public, max-age=604800",
//       },
//     });
//   } catch (err) {
//     console.error("Telegram image error:", err);

//     // Fallback image
//     const fallbackBuffer = await fs.readFile(fallbackImagePath);
//     return new NextResponse(fallbackBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": "image/png",
//         "Cache-Control": "no-cache",
//       },
//     });
//   }
// }
