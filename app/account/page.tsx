"use client";

import Image from "next/image";

export default function TelegramImage() {
  return (
    <Image
      src={`/api/telegram-file?fileId=AgACAgQAAyEGAASJB5gVAAIBMWfxCGUcEFzyaNI6o8dPt-kXk_AYAAIoxTEbKZGIUw51YthLK7XEAQADAgADeAADNgQ`}
      alt="Secure Telegram Image"
      width={400}
      height={400}
    />
  );
}
