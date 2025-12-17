"use client";

import { hairstyles } from "../../lib/get-data";

export function HairstyleGallery() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
          Trending · 2025
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold">
          2025 оны тренд үс засалтууд
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Хэрэглэгчдийн сонирхол, салонуудын эрэлтэд тулгуурласан загварууд
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hairstyles
          .slice()
          .sort((a, b) => b.popularity_score - a.popularity_score)
          .slice(0, 6)
          .map((h) => (
            <article
              key={h.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-44 md:h-52 overflow-hidden bg-gray-100">
                <img
                  src={h.image_url}
                  alt={h.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Popularity badge */}
                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
                  ⭐ {h.popularity_score}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg leading-tight">
                  {h.name}
                </h3>

                <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                  {h.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {h.category} · {h.length}
                  </span>
                  <span className="italic">Trending</span>
                </div>
              </div>
            </article>
          ))}
      </div>

      {/* Footer note (dynamic feel) */}
      <p className="mt-10 text-center text-xs text-muted-foreground">
        🔄 Трендүүд тогтмол шинэчлэгдэж байна
      </p>
    </section>
  );
}
