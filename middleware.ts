import { clerkMiddleware } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

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

    if (user?.emailAddresses[0]?.emailAddress !== "kirubelbewket@gmail.com") {
      return NextResponse.redirect(new URL("/404", req.url));
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
