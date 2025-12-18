"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

interface SalonCardData {
  id: number;
  name: string;
  salonAddress: string;
  salonImage: string | null;
  avgRating: number;
  reviewCount: number;
}

export function SalonContainer() {
  const [salons, setSalons] = useState<SalonCardData[]>([]);

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  return (
    <section id="salon" className="py-24 ">
      <div className="max-w-7xl mx-auto px-6 ">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Топ салонууд
            </h2>
            <p className="text-muted-foreground mt-2">
              Хэрэглэгчдийн үнэлгээгээр тэргүүлсэн
            </p>
          </div>

          <Link
            href="/salon"
            className="text-sm text-foreground hover:text-accent transition-colors hidden md:block"
          >
            Бүгдийг харах →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {salons
            .slice()
            .sort((a, b) => {
              const reviewDiff =
                Number(b.reviewCount ?? 0) - Number(a.reviewCount ?? 0);

              if (reviewDiff !== 0) return reviewDiff;

              return Number(b.avgRating ?? 0) - Number(a.avgRating ?? 0);
            })
            .slice(0, 4)
            .map((salon) => (
              <Link
                key={salon.id}
                href={`/salon/${salon.id}`}
                className="group block h-full"
              >
                <article className="h-full flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-lg">
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <SalonImage
                      src={salon.salonImage || "/salon_fallback.jpg"}
                      alt={salon.name}
                    />

                    {/* Rating */}
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-sm font-medium text-foreground backdrop-blur-sm">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      {(salon.avgRating ?? 0).toFixed(1)}
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-serif text-lg text-foreground transition-colors group-hover:text-primary">
                      {salon.name}
                    </h4>

                    <div className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 `flex-shrink-0`" />
                      <span className="line-clamp-2">{salon.salonAddress}</span>
                    </div>

                    <div className="mt-auto pt-3 text-xs text-muted-foreground">
                      {salon.reviewCount} үнэлгээ
                    </div>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export function SalonImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105 "
      onError={() => setImgSrc("/salon_fallback.jpg")}
    />
  );
}
