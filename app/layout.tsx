import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/NavBar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import favIcon from "@/app/favicon.png";

import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "sonner";
import SyncUser from "@/components/syncUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A2Z Market",
  description: "the first ethiopian automated ecommerce app using next js",
  icons: {
    icon: favIcon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster richColors position="top-center" />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="mt-16">{children}</main>
            <Footer />
            <SyncUser />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
