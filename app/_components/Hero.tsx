"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[90vh] flex items-center justify-center `bg-gradient-to-b` from-[#FAFAF9] via-[#b2bccf] to-[#e8d2c8]"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neutral-300/30 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Монголын шилдэг салонууд
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground text-balance">
            Бүх салонууд нэг дороос
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Улаанбаатар хотын шилдэг үсчин, гоо сайхны салонуудыг хайж олоод,
            цаг захиалаарай.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link href="/salon">
              <Button
                size="lg"
                className="group bg-foreground text-background hover:bg-foreground/90 gap-2 transition-all"
              >
                Цаг захиалах
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary bg-transparent"
            >
              Дэлгэрэнгүй
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
