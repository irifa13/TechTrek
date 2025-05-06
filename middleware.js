import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
]);

// Clerk middleware to handle authentication
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // Check the authenticated user's ID

  // If the user is not authenticated and is trying to access a protected route
  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn(); // Redirect the user to sign-in
  }

  return NextResponse.next(); // Allow the request to continue if the user is authenticated or the route is not protected
});

// Configuration for which routes this middleware should apply
export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
