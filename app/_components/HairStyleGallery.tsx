"use client";

import { useState } from "react";
import { hairstyles } from "../../lib/get-data";
import { Button } from "@/components/ui/button";

export function HairstyleGallery() {
  const [showAll, setShowAll] = useState(false);

  const visibleStyles = showAll ? hairstyles : hairstyles.slice(0, 5);

  return (
    <section id="trend" className="mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
          Trending · 2025
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
          2025 оны тренд үс засалтууд
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Орчин үеийн стиль, inspiration gallery
        </p>
      </div>

      {/* Grid */}
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 transition-all duration-500`}
      >
        {visibleStyles
          .slice()
          .sort((a, b) => b.popularity_score - a.popularity_score)
          .map((h) => (
            <article
              key={h.id}
              className="group relative h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-muted">
                <img
                  src={h.image_url}
                  alt={h.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute right-2 top-2 rounded-full bg-card/95 px-2 py-0.5 text-[11px] font-medium backdrop-blur">
                  ⭐ {h.popularity_score}
                </div>
              </div>

              {/* Content */}
              <div className="relative p-3">
                <h3 className="font-serif text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  {h.name}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {h.description}
                </p>

                <div className="mt-2 text-[11px] text-muted-foreground">
                  {h.category} · {h.length}
                </div>

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 z-10 flex items-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-xs text-white leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
      </div>

      {/* Show more */}
      {hairstyles.length > 5 && (
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll((prev) => !prev)}
            className="rounded-full px-8"
          >
            {showAll ? "Багасгах  ↑" : "Бүгдийг харах  ↓"}
          </Button>
        </div>
      )}
    </section>
  );
}
