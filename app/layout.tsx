import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AdminLayout } from "./_components/AdminLayout";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./_components/ThemeProvider";
import { Header } from "./_components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxe Hair Salon",
  description: "Luxe Hair Salon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AdminLayout>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster position="top-right" reverseOrder={false} />
            </ThemeProvider>
          </AdminLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
