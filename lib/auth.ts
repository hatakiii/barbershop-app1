// lib/auth.ts
import { auth } from "@clerk/nextjs/server";

export type Role = "barber" | "manager" | "owner" | "admin";

export async function getCurrentUser() {
  const { userId, sessionClaims } = await auth();

  if (!userId) return null;

  // We are now catching 'publicMetadata' from the sessionClaims
  const metadata = sessionClaims?.publicMetadata as { role?: Role };

  //   console.log("SessionClaims", sessionClaims);
  //   console.log("Server side catch:", metadata?.role); // Debugging line

  return {
    userId,
    role: metadata?.role || null,
  };
}
