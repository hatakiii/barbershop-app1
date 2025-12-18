"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { CustomUser } from "./CustomUser";

const navLinks = [
  { href: "#home", label: "Нүүр" },
  { href: "#services", label: "Үйлчилгээ" },
  { href: "#team", label: "Бид" },
  { href: "#gallery", label: "Блог" },
  { href: "#contact", label: "Холбогдох" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50  backdrop-blur-sm border-b ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Luxe Hair Studio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Нэвтрэх
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button size="sm">Бүртгүүлэх</Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <CustomUser />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-2">
                <SignedOut>
                  <div className="flex flex-col gap-2">
                    <SignInButton mode="modal">
                      <Button variant="ghost" size="sm">
                        Нэвтрэх
                      </Button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                      <Button size="sm">Бүртгүүлэх</Button>
                    </SignUpButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <CustomUser />
                </SignedIn>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
