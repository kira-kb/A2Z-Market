import { NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import fs from "fs/promises";
import { existsSync, createReadStream } from "fs";
import { join } from "path";

const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!;
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
    // Serve from local cache if exists
    if (existsSync(localPath)) {
      const stream = createReadStream(localPath);
      return new NextResponse(stream as unknown as ReadableStream<Uint8Array>, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=302400", // 1 week
        },
      });
    }

    // Otherwise, fetch from Telegram
    const bot = new TelegramBot(botToken, { polling: false });
    const file = await bot.getFile(fileId);
    const telegramUrl = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`;

    const response = await fetch(telegramUrl);
    if (!response.ok) throw new Error("Failed to fetch Telegram image");

    const buffer = Buffer.from(await response.arrayBuffer());

    // Ensure cache dir exists
    await fs.mkdir(cacheDir, { recursive: true });

    // Save locally
    await fs.writeFile(localPath, buffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=302400", // 1 week
        // "Cache-Control": "public, max-age=604800", // 1 week
      },
    });
  } catch (err) {
    console.error("Telegram image error:", err);

    // Fallback image
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
