"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center justify-center bg-indigo-50/60"
    >
      <div className="max-w-6xl mx-auto px-6 py-24">
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
                className="bg-foreground text-background hover:bg-foreground/90 gap-2"
              >
                Цаг захиалах
                <ArrowRight className="w-4 h-4" />
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

          {/* Stats */}
          {/* <div className="flex justify-center gap-12 pt-12">
            <div className="text-center">
              <p className="text-3xl font-semibold text-foreground">50+</p>
              <p className="text-sm text-muted-foreground mt-1">Салон</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground mt-1">Хэрэглэгч</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-foreground">25K+</p>
              <p className="text-sm text-muted-foreground mt-1">Захиалга</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
