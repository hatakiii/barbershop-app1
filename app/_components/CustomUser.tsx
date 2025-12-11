"use client";

import { useUser, SignOutButton, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

export function CustomUser() {
  const { user } = useUser();
  const clerk = useClerk();
  const profileImage = user?.imageUrl;

  const openManageAccount = () => {
    clerk.openUserProfile();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {profileImage ? (
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 rounded-full overflow-hidden ring-2 ring-primary/50 hover:ring-primary transition-all duration-200"
          >
            <img
              src={profileImage}
              alt={user.fullName || "User"}
              className="w-full h-full object-cover rounded-full"
            />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="w-8 h-8 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-1 overflow-hidden"
      >
        {/* Profile (Manage Account modal) */}
        <DropdownMenuItem
          onClick={openManageAccount}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 cursor-pointer"
        >
          Profile
        </DropdownMenuItem>

        {/* My Orders */}
        <DropdownMenuItem
          onClick={() => (window.location.href = "/orderHistory")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 cursor-pointer"
        >
          My Orders
        </DropdownMenuItem>

        {/* Sign Out */}
        <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 cursor-pointer">
          <SignOutButton>Sign Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// app/layout.tsx
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "react-hot-toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Luxe Hair Salon",
//   description: "Luxe Hair Salon",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}

//         <Toaster position="top-right" reverseOrder={false} />
//       </body>
//     </html>
//   );
// }
