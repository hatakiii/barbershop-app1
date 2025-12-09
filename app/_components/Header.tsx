"use client";

import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { CustomUser } from "./CustomUser";

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">
                Luxe Hair Studio
              </h1>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-primary transition-colors">
              Нүүр
            </a>
            <a
              href="#services"
              className="hover:text-primary transition-colors"
            >
              Үйлчилгээ
            </a>
            <a href="#team" className="hover:text-primary transition-colors">
              Бид
            </a>
            <a href="#gallery" className="hover:text-primary transition-colors">
              Блог
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Холбогдох
            </a>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>77779999</span>
            </div> */}

            <div className="flex items-center space-x-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Нэвтрэх
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Бүртгүүлэх
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <CustomUser />
              </SignedIn>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
