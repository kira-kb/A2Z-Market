import { clerkMiddleware } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";
import adminList from "@/lib/adminList.json";

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const userId = (await auth()).userId;

    if (!userId) {
      return NextResponse.redirect(
        // new URL("/sign-in?redirect_url=" + req.nextUrl.pathname, req.url)
        new URL("/not-found", req.url)
      );
    }

    const user = await users.getUser(userId);

    // const admin = adminList.filter(
    //   (admin) => admin.email === user?.emailAddresses[0]?.emailAddress
    // );
    const admin = adminList.some(
      (admin) => admin.email === user?.emailAddresses[0]?.emailAddress
    );

    // if (user?.emailAddresses[0]?.emailAddress !== "kirubelbewket@gmail.com") {
    if (!admin) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
