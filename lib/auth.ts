//lib/auth.ts-ийн зорилго нь Clerk-ээс нэвтэрсэн user-ийг авч,
// манай database-ийн user-тэй холбож, role-той нь хамт буцаах явдал.
// Dashboard, layout, page бүр үүнийг л дуудаж ашиглана.

// lib/auth.ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function getCurrentUser() {
  const { userId }: any = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  //   const user = await prisma.user.findUnique({
  //     where: { clerkId: userId },
  //   });

  //   if (!user) {
  //     redirect("/not-authorized");
  //   }

  //   return user;
}
