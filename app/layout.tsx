import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/NavBar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="mt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

// ??????????????????????????????????????????????????????
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import Navbar from "../components/NavBar";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import Footer from "@/components/footer";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/SideBar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "A2Z Market",
//   description: "the first ethiopian automated ecommerce app using next js",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <Navbar />
//           <main className="mt-16">
//             <SidebarProvider className="relative">
//               <AppSidebar />
//               <div className="flex-1">
//                 <SidebarTrigger className="fixed block md:hidden" />
//                 {children}
//                 <Footer />
//               </div>
//             </SidebarProvider>
//           </main>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
