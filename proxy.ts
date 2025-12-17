import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Define which routes are "Admin Only"
const isAdminRoute = createRouteMatcher(["/workers/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // 2. Protect the route and get the session data
  const { userId, sessionClaims } = await auth();

  // 3. Extract the role from the publicMetadata we added to the JWT template
  const role = (sessionClaims?.publicMetadata as { role?: string })?.role;

  // 4. If the user is trying to access admin and isn't an admin, redirect them
  if (isAdminRoute(req)) {
    if (!userId || role !== "admin") {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
