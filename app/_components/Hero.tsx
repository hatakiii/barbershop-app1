"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden
      `bg-gradient-to-b` from-[#f4f4ee] via-[#beceee] to-[#c0b8b5]"
    >
      {/* ===== BACKGROUND GLOW ===== */}
      <div className="pointer-events-none absolute inset-0 z-0 flex justify-center">
        <div className="mt-[-140px] h-[420px] w-[420px] rounded-full bg-neutral-300/30 blur-[120px]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur text-sm text-muted-foreground shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Монголын шилдэг салонууд
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground text-balance">
            Бүх салонууд
            <br className="hidden sm:block" />
            <span className="text-foreground"> нэг дороос</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Улаанбаатар хотын шилдэг үсчин, гоо сайхны салонуудыг хялбараар олж,
            цаг захиалаарай.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/salon">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 gap-2
                transition-all hover:scale-[1.03]"
              >
                Цаг захиалах
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/70 backdrop-blur border-border hover:bg-white
              transition-all hover:scale-[1.03]"
            >
              Дэлгэрэнгүй
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
